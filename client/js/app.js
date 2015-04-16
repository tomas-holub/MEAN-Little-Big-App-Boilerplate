/**
 * Module app
 */
define([
    'angular',
    'angular-route',
    'angular-ui-router',
    'ngStorage',
    'angular-messages',
    'mm-foundation',
    'controllers/_loader',
    'services/_loader',
    'filters/_loader',
    'directives/_loader',
    'templates'
], function (angular) {
    return angular.module('app', [
        'ngRoute',
        'ui.router',
        'ngStorage',
        'ngMessages',
        'mm.foundation',
        'app.controllers',
        'app.services',
        'app.filters',
        'app.directives',
        'templates'
    ]);
});
