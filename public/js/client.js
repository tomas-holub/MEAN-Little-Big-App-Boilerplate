var app = angular.module('app',[]);

app.controller('MainController', ['$scope', function($scope) {
    $scope.name = "Ari";
    $scope.sayHello = function() {
        $scope.greeting = "Hello " + $scope.name;
    }
}]);


app.controller('TodoController',['$scope', function($scope){
    $scope.list=['prvni','druhej','treti'];

    $scope.add = function(item) {
        $scope.list.push(item);
    }

}]);

angular.element(document).ready(function(){
    angular.bootstrap(document,['app'])
});