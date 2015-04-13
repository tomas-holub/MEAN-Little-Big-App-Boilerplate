/**
 * @ngdoc controller
 * @name app.controllers.controller:RegisterController
 * @description
 * Handles scope of the register form view
 */
define(['./_module'], function (controllers) {
    var RegisterController = function ($scope, AuthService) {

        /**
         * @ngdoc method
         * @name register
         * @methodOf app.controllers.controller:RegisterController
         * @description
         * Uses the data from ng-models of registration form to register new user
         */
        this.register = function () {

            var formData = {
                email: this.email,
                password: this.password,
                password_repeat: this.password_repeat
            };
            AuthService.register(formData);
        }
    };
    RegisterController.$inject = ['$scope', 'AuthService'];
    controllers.controller('RegisterController', RegisterController);
});