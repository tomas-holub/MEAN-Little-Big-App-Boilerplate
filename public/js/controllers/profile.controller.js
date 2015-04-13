/**
 * @ngdoc controller
 * @name app.controllers.controller:ProfileController
 * @description
 * Handles scope of the user profile view
 */
define(['./_module'], function (controllers) {
    var ProfileController = function ($scope, UserService, $state) {
        var profile = this;

        UserService.getUserById().then(function(res){
            profile.users = res.data;
        });
    };
    ProfileController.$inject = ['$scope', 'UserService', '$state'];
    controllers.controller('ProfileController', ProfileController);
});