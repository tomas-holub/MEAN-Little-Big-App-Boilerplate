/**
 * @ngdoc service
 * @name app.services.service:AuthInterceptor
 * @description
 * Intercepts request and adds JWT toke for authentication purposes
 */
define(['./_module'], function(services){

    var AuthInterceptor = function($localStorage) {
        return {

            /**
             * @ngdoc method
             * @name request
             * @methodOf app.services.service:AuthInterceptor
             * @param {Object} config request config object
             * @description
             * Adds JWT token to every request config object in case user is authenticated
             * @returns {Object} request config object
             */
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