define(['./_module'], function (services) {
    services.factory('articleFactory', ['$http', function ($http) {

        var baseUrl = 'http://localhost:3000/api/v1';

        return {
            getArticles: function () {
                return $http.get(baseUrl + '/article');
            }
        }
    }]);
});