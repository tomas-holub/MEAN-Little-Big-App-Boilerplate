define(['./_module'], function (services) {
    services.factory('timestampInterceptor', function () {
        return {
            request: function(config){
                config.requestTimeStamp = new Date().getTime();
                return config;
            },
            response: function(response){
                response.config.responseTimeStamp = new Date().getTime();

                var time = response.config.responseTimeStamp - response.config.requestTimeStamp;

                response.config.requestTime = time;

                return response;
            }
        };
    });
});
