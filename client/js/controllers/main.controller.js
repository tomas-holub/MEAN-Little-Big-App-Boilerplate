define(['./_module'], function(controllers){
    var MainCtrl = function($scope, tom, articleFactory, articles, accommodation) {
        $scope.libraries = 'asdas';

        console.log(accommodation);
        console.log(articles);

        tom.greet('hi');
        tom.say('ou');


        articleFactory.getArticles().then(function(response){
            console.log(response);
        });

        this.test = "huu";
    }
    MainCtrl.$inject = ['$scope', 'tom', 'articleFactory', 'articles','accommodation'];
    controllers.controller('MainCtrl', MainCtrl);
});
