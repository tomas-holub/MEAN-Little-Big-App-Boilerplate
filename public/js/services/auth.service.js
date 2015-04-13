define(['./_module'], function(services) {

    var AuthService =  function(CONFIG, $http, $localStorage,$q) {

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];

                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        return {
            register: function(data){
                return $http.post(CONFIG.apiBase + 'users',data).then(function(res,err){
                    console.log(res);
                });
            },
            login: function(data){
                return $http.post(CONFIG.apiBase + 'login',data).then(function(res){
                    if (res.data.token) {
                        $localStorage.token = res.data.token;
                    } else {
                        return $q.reject('Missing authentication token');
                    }
                });
            },
            isLoggedIn: function() {

                //return $http.get(CONFIG.apiBase + 'users').then(function(res){
                //
                //}, function(err){
                //    delete $localStorage.token;
                //    return $q.reject('Not logged in');
                //});

                var user = getUserFromToken();

                if (typeof user.email !== 'undefined') {
                    return true;
                }

                return false;
            },
            logout: function(){
                return $http.post(CONFIG.apiBase + 'logout').then(function(res){
                    delete $localStorage.token;
                });
            }
        }
    };

    AuthService.$inject = ['CONFIG','$http','$localStorage','$q'];
    services.factory('AuthService', AuthService);
});