define([
    'angular',
    'config',
    'app'
], function (angular) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['tom'], {strictDi: true});
    });
});
