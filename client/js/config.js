define([
    'app'
], function (app) {
    app.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            controller: "MainCtrl as main",
            template: "{{main.test}}"
        }).otherwise({template: "aaaaa"});;
    }]);
});