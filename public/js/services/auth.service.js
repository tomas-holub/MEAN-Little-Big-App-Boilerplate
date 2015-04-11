define(['./_module'], function(services) {
    var AuthService =  function(CONFIG, $http, $localStorage,$q) {
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
            }
        }
    };
    AuthService.$inject = ['CONFIG','$http','$localStorage','$q'];
    services.factory('AuthService', AuthService);
});