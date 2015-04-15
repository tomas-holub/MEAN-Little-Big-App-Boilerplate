/**
 * @ngdoc controller
 * @name app.controllers.controller:ProfileController
 * @description
 * Handles scope of the user profile view
 */
define(['./_module'], function (controllers) {
    var ProfileController = function ($scope, AuthService, me) {

        var profile = this;

        /**
         * @ngdoc property
         * @name user
         * @propertyOf app.controllers.controller:LogInController
         * @description
         * Current user object
         */
        this.user = me.data.user;

    };
    ProfileController.$inject = ['$scope', 'AuthService', 'me'];
    controllers.controller('ProfileController', ProfileController);
});