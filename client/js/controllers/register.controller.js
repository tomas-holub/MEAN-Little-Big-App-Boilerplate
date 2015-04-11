define(['./_module'], function (controllers) {
    var RegisterController = function ($scope, AuthService){

        this.test = "aaaa";

        this.register = function() {

            var formData = {
                email: this.email,
                password: this.password,
                password_repeat: this.password_repeat
            };
            console.log(formData);
            AuthService.register(formData);
        }
    };
    RegisterController.$inject = ['$scope', 'AuthService'];
    controllers.controller('RegisterController', RegisterController);
});