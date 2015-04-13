/**
 * @ngdoc controller
 * @name app.controllers.controller:LogInController
 * @description
 * Handles scope of the login form view
 */
define(['./_module'], function (controllers) {
    var LogInController = function ($scope, AuthService, $state){

        /**
         * @ngdoc method
         * @name login
         * @methodOf app.controllers.controller:LogInController
         * @description
         * Uses the data from ng-models of login form to login user, when successful changes state to user profile
         */
        this.login = function(){
            var formData = {
                email: this.email,
                password: this.password
            };
            AuthService.login(formData).then(function(){
                $state.go('app.profile',null, {reload: true});
            });
        }
    };
    LogInController.$inject = ['$scope', 'AuthService', '$state'];
    controllers.controller('LogInController', LogInController);
});