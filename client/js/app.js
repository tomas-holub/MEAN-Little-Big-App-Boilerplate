define([
    'angular',
    'angular-route',
    'controllers/_loader',
    'services/_loader',
    'filters/_loader',
    'directives/_loader'
], function (angular) {
    return angular.module('tom', [
        'ngRoute',
        'app.controllers',
        'app.services',
        'app.filters',
        'app.directives'
    ]);
});
