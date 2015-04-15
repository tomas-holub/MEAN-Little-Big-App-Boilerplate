/**
 * @ngdoc service
 * @name app.services.service:AuthService
 * @description
 * Manages user registration, login, logout and user-logged checks
 */
define(['./_module'], function (services) {

    var AuthService = function (CONFIG, $http, $localStorage, $q) {

        /**
         * @ngdoc method
         * @name urlBase64Decode
         * @methodOf app.services.service:AuthService
         * @param {String} str JWT token string
         * @description
         * Decodes part of JWT token with payload
         * @returns {Object} request config object
         */
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

        /**
         * @ngdoc method
         * @name getUserFromToken
         * @methodOf app.services.service:AuthService
         * @description
         * Locates middle part of JWT, which includes payload and extracts user from token
         * @returns {Object} User object
         */
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

            /**
             * @ngdoc method
             * @name register
             * @methodOf app.services.service:AuthService
             * @description
             * Handles http post to REST api to create new user
             * @returns {Object} A Promise
             */
            register: function (data) {
                return $http.post(CONFIG.apiBase + 'users', data);
            },

            /**
             * @ngdoc method
             * @name login
             * @methodOf app.services.service:AuthService
             * @description
             * Handles http post to REST api to login existing user
             * @returns {Object} A Promise
             */
            login: function (data) {
                return $http.post(CONFIG.apiBase + 'login', data).then(function (res) {
                    if (res.data.token) {
                        $localStorage.token = res.data.token;
                        return res;
                    } else {
                        return $q.reject('Missing authentication token');
                    }
                });
            },

            /**
             * @ngdoc method
             * @name isLoggedIn
             * @methodOf app.services.service:AuthService
             * @description
             * Checks whether user exists, based on the existence of valid JWT token.
             * Remember this doesn't say anything about status of the API.
             * @returns {Object} A Promise
             */
            isLoggedIn: function () {

                var user = getUserFromToken();

                if (typeof user.email !== 'undefined') {
                    return true;
                }

                return false;
            },

            /**
             * @ngdoc method
             * @name logout
             * @methodOf app.services.service:AuthService
             * @description
             * Handles http post to REST api to logout existing user.
             * This call invalidates JWT on server and deletes JWT from client local storage
             * @returns {Object} A Promise
             */
            logout: function () {
                return $http.post(CONFIG.apiBase + 'logout').then(function (res) {
                    delete $localStorage.token;
                });
            }
        }
    };

    AuthService.$inject = ['CONFIG', '$http', '$localStorage', '$q'];
    services.factory('AuthService', AuthService);
});