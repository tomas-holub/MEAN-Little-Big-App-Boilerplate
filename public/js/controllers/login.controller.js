/**
 * @ngdoc controller
 * @name app.controllers.controller:LogInController
 * @description
 * Handles scope of the login form view
 */
define(['./_module'], function (controllers) {
    var LogInController = function ($scope, AuthService, $state){

        var login    = this;
        this.invalid = false;

        /**
         * @ngdoc property
         * @name message
         * @propertyOf app.controllers.controller:LogInController
         * @description
         * Property of form general error message
         */
        this.message = 'Please fill the form';

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
        };

        /**
         * @ngdoc method
         * @name submit
         * @methodOf app.controllers.controller:LogInController
         * @description
         * Based on the form validity it displays error message or executes login()
         */
        this.submit = function(isValid){
            if (isValid){
                this.login();
            } else {
                this.invalid = true;
            }
        }

        $scope.$watch(angular.bind(this, function(){
            return {
                email: this.email,
                password: this.password
            }
        }), function (newVal, oldVal) {
            if( newVal.email || newVal.password) {
                login.invalid = false;
            }
        }, true);

    };
    LogInController.$inject = ['$scope', 'AuthService', '$state'];
    controllers.controller('LogInController', LogInController);
});