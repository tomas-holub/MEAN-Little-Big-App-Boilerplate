/**
 * @ngdoc service
 * @name app.services.service:UserService
 * @description
 * Manages user CRUD
 */
define(['./_module'], function(services){
    var UserService = function(CONFIG, $http) {

        return {
            /**
             * @ngdoc method
             * @name get
             * @methodOf app.services.service:UserService
             * @description
             * Handles http request GET /users
             * @returns {Object} A Promise
             */
            get: function(){
                return $http.get(CONFIG.apiBase + 'users');
            },
            /**
             * @ngdoc method
             * @name getUserById
             * @methodOf app.services.service:UserService
             * @description
             * Handles http request GET /users/:id
             * @returns {Object} A Promise
             */
            getUserById: function(id){
                return $http.get(CONFIG.apiBase + 'users/' + id);
            },
            /**
             * @ngdoc method
             * @name create
             * @methodOf app.services.service:UserService
             * @param {Object} data description
             * @description
             * Handles http request POST /users/:id
             * @returns {Object} A Promise
             */
            create: function(id, data){
                return $http.post(CONFIG.apiBase + 'users/' + id, data);
            },
            /**
             * @ngdoc method
             * @name update
             * @methodOf app.services.service:UserService
             * @param {Object} data description
             * @description
             * Handles http request PUT /users/:id
             * @returns {Object} A Promise
             */
            update: function(id, data){
                return $http.put(CONFIG.apiBase + 'users/' + id, data);
            },
            /**
             * @ngdoc method
             * @name delete
             * @methodOf app.services.service:UserService
             * @description
             * Handles http request DELETE /users/:id
             * @returns {Object} A Promise
             */
            delete: function(id){
                return $http.delete(CONFIG.apiBase + 'users/' + id);
            }
        }
    };

    UserService.$inject = ['CONFIG','$http'];
    services.factory('UserService', UserService);
});