var allTestFiles = [];
var TEST_REGEXP = /base\/tests\/unit\/spec/;
var pathToModule = function(path) {
    return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};
Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
        allTestFiles.push(pathToModule(file));
    }
});
requirejs.config({
    baseUrl: '/base',  // Karma serves files from /base/<your-base-path>
    paths: {
        'angular': 'bower_components/angular/angular',
        'domReady': 'bower_components/domReady/domReady',
        'angular-route': 'bower_components/angular-route/angular-route',
        'angular-resource': 'bower_components/angular-resource/angular-resource',
        'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router',
        'angular-mocks': 'bower_components/angular-mocks/angular-mocks',
        'js': 'client/js'
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
        },
        'angular-ui-router':{
            deps:['angular']
        },
        'angular-mocks' : {
            deps: ['angular']
        }
    },
    deps: allTestFiles , // add tests array to load our tests

    callback: window.__karma__.start  // start tests once Require.js is done
});