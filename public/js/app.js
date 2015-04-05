define([
    'angular',
    'angular-route',
    'controllers/_loader',
    'services/_loader'
], function (angular) {
    return angular.module('tom', [
        'ngRoute',
        'app.controllers',
        'app.services'
    ]);
});
