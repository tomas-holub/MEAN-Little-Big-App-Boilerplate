define(['./_module'], function(services){
   services.factory('requestRejectorInterceptor',['$q', function($q){
       return {
           request: function(config) {
                return $q.reject('custom rejection');
           }
       }
   }]);

    services.factory('requestRecovererInterceptor', ['$q', function($q){
        return {
            requestError: function(rejectReason) {

                if (rejectReason === 'custom rejection') {
                    return {
                        transformRequest: [],
                        transformResponse: [],
                        method: 'GET',
                        url: 'http://localhost:3000/api/v1/article',
                        headers: {
                            Accept: 'application/json, text/plain, */*'
                        }
                    }
                }

                return $q.reject(rejectReason);
            }
        }
    }]);

});