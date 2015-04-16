/**
 * @ngdoc filter
 * @name app.filters.filter:reverseFilter
 * @description
 * Reverses the given string
 */
define(['./_module'], function (filters) {
    filters.config(['$filterProvider', function($filterProvider){
        $filterProvider.register('reverseFilter', function(){
            return function(item) {
                return item.split("").reverse().join("");
            }
        })
    }]);
});