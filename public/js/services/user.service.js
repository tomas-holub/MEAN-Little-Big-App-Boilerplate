define(['./_module'], function(services){
    var UserService = function(CONFIG, $http) {

        return {
            getUserById: function(){
                return $http.get(CONFIG.apiBase + 'users');
            }
        }
    };

    UserService.$inject = ['CONFIG','$http'];
    services.factory('UserService', UserService);
});