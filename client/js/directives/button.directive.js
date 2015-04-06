define(['./_module'], function(directives){
    directives.directive('button', function(){
        return {
            restrict: 'A',
            template:'<button>ahoj</button>'
        };
    })
});