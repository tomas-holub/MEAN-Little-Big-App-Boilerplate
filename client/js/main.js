require.config({
    paths: {
        'angular': '../../bower_components/angular/angular',
        'domReady': '../../bower_components/domReady/domReady',
        'angular-route': '../../bower_components/angular-route/angular-route',
        'angular-resource': '../../bower_components/angular-resource/angular-resource'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        'angular-resource' : {
            deps: ['angular']
        },
        'angular-route' : {
            deps: ['angular']
        }
    }
});

require(['bootstrap'], function(){});