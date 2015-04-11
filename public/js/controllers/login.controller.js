define(['./_module'], function (controllers) {
    var LogInController = function ($scope, AuthService, $state){
        this.login = function(){
            var formData = {
                email: this.email,
                password: this.password
            };
            AuthService.login(formData).then(function(){
                $state.go('welcome');
            });
        }
    };
    LogInController.$inject = ['$scope', 'AuthService', '$state'];
    controllers.controller('LogInController', LogInController);
});