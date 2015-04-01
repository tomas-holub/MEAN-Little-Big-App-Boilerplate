require.config({
    paths: {
        'require':'bower_components/requirejs/require',
        'angular': 'bower_components/angular/angular',
        'domReady': 'bower_components/domReady/domReady',
        'angular-route': 'bower_components/angular-route/angular-route',
        'angular-resource': 'bower_components/angular-resource/angular-resource'
    },
    shim: {
        angular: {
            exports: 'angular',
            deps: ['require']
        },
        'angular-resource' : {
            deps: ['angular']
        },
        'angular-route' : {
            deps: ['angular']
        }
    }
});