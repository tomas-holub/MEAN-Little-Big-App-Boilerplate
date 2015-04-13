define(['./_module'], function (filters) {
    filters.config(['$filterProvider', function($filterProvider){
        $filterProvider.register('reverseFilter', function(){
            return function(item) {
                return item.split("").reverse().join("");
            }
        })
    }]);
});