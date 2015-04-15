/**
 * Module app.services
 */
define(['angular'], function(angular){

    var services = angular.module('app.services',['ngStorage']);

    services.constant("CONFIG", {
        apiBase: '/api/v1/'
    });


    return services;
});
