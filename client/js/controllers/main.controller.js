define(['./_definition'], function(controllers){
    var MainCtrl = function(s) {
        this.test = "huu";
    }
    MainCtrl.$inject = ['$scope'];
    controllers.controller('MainCtrl', MainCtrl);
});
