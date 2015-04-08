define(['./_module'], function (controllers) {

    var SampleCtrl = function ($scope) {
        $scope.logChore = function (chore) {
            console.log('CHore ' + chore + ' is done');
        }

        //$scope.message = {text:"zprava"};

        $scope.logTask = function (task) {
            console.log('to je nas ' + task);
        };

        $scope.name = "jmeno";
        $scope.updated = 0;
        $scope.$watch('name', function (newVal, oldVal) {
            if (newVal === oldVal) {
                return;
            }
            $scope.updated++;
        });

    };

    SampleCtrl.$inject = ['$scope'];

    controllers.controller('SampleCtrl', SampleCtrl);
});