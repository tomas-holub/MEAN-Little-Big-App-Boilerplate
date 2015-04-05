
module.exports = function (config) {
    config.set({
        frameworks: ["jasmine", "requirejs"],
        files: [
            {pattern: 'bower_components/angular/angular.js', included: false},
            {pattern: 'bower_components/domReady/domReady.js', included: false},
            {pattern: 'bower_components/angular-route/angular-route.js', included: false},
            {pattern: 'bower_components/angular-resource/angular-resource.js', included: false},
            {pattern: 'bower_components/angular-mocks/angular-mocks.js', included: false},
            {pattern: 'public/js/**/*.js', included: false},
           // {pattern: 'client/js/**/*.js', included: false},
            {pattern: 'tests/unit/spec/**/*.js', included: false},
            'tests/unit/config/test-main.js'
        ],
        exclude: [
            'public/js/main.js'
            //'client/js/main.js'
        ],

        port: 9876,
        runnerPort: 9100,
        colors: true,
        autoWatch: false,
        browsers: ['Chrome'],
        browserNoActivityTimeout: 100000,
        captureTimeout: 20000,
        singleRun: true
    });
}