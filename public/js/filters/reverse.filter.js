define(['./_module'], function (filters) {
    console.log(filters);

    filters.config(function($filterProvider){
        $filterProvider.register('reverseFilter', function(){
            return function(item) {
                return item.split("").reverse().join("");
            }
        })
    });

    //filters.filter('reverseFilter', function () {
    //    return function (item) {
    //        return item.split("").reverse().join("");
    //    }
    //});
})