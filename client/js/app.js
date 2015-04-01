define([
    'angular',
    'angular-route',
    'controllers/_loader'
], function (angular) {
    return angular.module('tom', [
        'ngRoute',
        'app.controllers'
    ]);
});
