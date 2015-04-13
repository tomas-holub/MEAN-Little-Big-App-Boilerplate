/**
 * @ngdoc controller
 * @name app.controllers.controller:MainCtrl
 * @description
 * This is the main controller
 */


define(['./_module'], function (controllers) {
    var MainCtrl = function ($scope, tom, articleFactory, articles, accommodation) {

        /**
         * @ngdoc method
         * @name sayHello
         * @methodOf app.controllers.controller:MainCtrl
         * @description
         * Logs Hello in to the js console
         *
         * @param {string} param This parameter doesn't really exist
         */
        this.sayHello = function () {
            console.log('Hello');
        }


        $scope.libraries = 'asdas';

        console.log(accommodation);
        console.log(articles);

        tom.greet('hi');
        tom.say('ou');


        articleFactory.getArticles().then(function (response) {
            console.log(response);
        });

        this.test = "huu";
    }
    MainCtrl.$inject = ['$scope', 'tom', 'articleFactory', 'articles', 'accommodation'];
    controllers.controller('MainCtrl', MainCtrl);
});
