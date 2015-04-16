/**
 * Manual bootstraps angular app
 */
define([
    'angular',
    'config',
    'app'
], function (angular) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app'], {strictDi: true});
    });
});
