/**
 * @ngdoc controller
 * @name app.controllers.controller:RegisterController
 * @description
 * Handles scope of the register form view
 */
define(['./_module'], function (controllers) {
    var RegisterController = function ($scope, AuthService, $state) {

        var login    = this;
        this.invalid = false;

        /**
         * @ngdoc property
         * @name message
         * @propertyOf app.controllers.controller:RegisterController
         * @description
         * Property of form general error message
         */
        this.message = 'Please fill the form';

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
            AuthService.register(formData).then(function(){
                $state.go('app.sign_in',null, {reload: true});
            });
        }

        /**
         * @ngdoc method
         * @name submit
         * @methodOf app.controllers.controller:RegisterController
         * @description
         * Based on the form validity it displays error message or executes register()
         */
        this.submit = function(isValid){
            if (isValid){
                this.register();
            } else {
                this.invalid = true;
            }
        }


        $scope.$watch(angular.bind(this, function(){
            return {
                email: this.email,
                password: this.password,
                password_repeat: this.password_repeat
            }
        }), function (newVal, oldVal) {
            if( newVal.email || newVal.password || newVal.password_repeat) {
                login.invalid = false;
            }
        }, true);

    };




    RegisterController.$inject = ['$scope', 'AuthService', '$state'];
    controllers.controller('RegisterController', RegisterController);
});