define(['./_module'], function(services){

    var AuthInterceptor = function($localStorage) {
        return {
            request: function(config) {
                if ($localStorage.token) {
                    config.headers['x-access-token'] = $localStorage.token;
                }
                return config;
            }
        }
    };

    AuthInterceptor.$inject = ['$localStorage'];
    services.factory('AuthInterceptor', AuthInterceptor);
});