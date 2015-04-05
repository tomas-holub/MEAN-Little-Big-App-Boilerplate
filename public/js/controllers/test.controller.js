define(['./_module'], function(controllers){

    var TestCtrl = function($scope) {
        $scope.tom = "tom";
    }

    TestCtrl.$inject = ['$scope'];
    controllers.controller('TestCtrl', TestCtrl);
});