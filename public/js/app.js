define([
    'angular',
    'angular-route',
    'angular-ui-router',
    'ngStorage',
    'mm-foundation',
    'controllers/_loader',
    'services/_loader',
    'filters/_loader',
    'directives/_loader',
    'templates'
], function (angular) {
    return angular.module('tom', [
        'ngRoute',
        'ui.router',
        'ngStorage',
        'mm.foundation',
        'app.controllers',
        'app.services',
        'app.filters',
        'app.directives',
        'templates'
    ]);
});
