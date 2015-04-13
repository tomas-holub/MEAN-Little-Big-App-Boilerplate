define(['./_module'], function(services){
    services.factory('tom', function(){
        return {
            greet : function(greet){
                return greet;
            }
        }
    });
});