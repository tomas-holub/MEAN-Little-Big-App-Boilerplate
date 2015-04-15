require.config({
    paths: {
        'require':'bower_components/requirejs/require',
        'angular': 'bower_components/angular/angular',
        'domReady': 'bower_components/domReady/domReady',
        'angular-route': 'bower_components/angular-route/angular-route',
        'angular-resource': 'bower_components/angular-resource/angular-resource',
        'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router',
        'ngStorage':'bower_components/ngstorage/ngStorage',
        'angular-messages':'bower_components/angular-messages/angular-messages',
        'mm-foundation': 'bower_components/angular-foundation/mm-foundation-tpls',
        'templates': 'client/js/templates'
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
        },
        'angular-ui-router':{
            deps:['angular']
        },
        'ngStorage':{
            deps:['angular']
        },
        'angular-messages':{
            deps:['angular']
        },
        'mm-foundation':{
            deps:['angular']
        },
        templates:{
            deps:['angular']
        }
    }
});