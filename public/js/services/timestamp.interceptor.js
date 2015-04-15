/**
 * @ngdoc service
 * @name app.services.service:TimestampInterceptor
 * @description
 * Intercepts request in order to measure response time
 */
define(['./_module'], function (services) {
    services.factory('TimestampInterceptor', function () {
        return {

            /**
             * @ngdoc method
             * @name request
             * @methodOf app.services.service:TimestampInterceptor
             * @param {Object} config request config object
             * @description
             * Intercepts every request and adds request timestamp to the request config object
             * @returns {Object} request config object
             */
            request: function (config) {
                config.requestTimeStamp = new Date().getTime();
                return config;
            },

            /**
             * @ngdoc method
             * @name response
             * @methodOf app.services.service:TimestampInterceptor
             * @param {Object} response response object
             * @description
             * Intercepts every response, adds response timestamp to the response config object and counts
             * request time difference
             * @returns {Object} response object
             */
            response: function (response) {
                response.config.responseTimeStamp = new Date().getTime();

                var time = response.config.responseTimeStamp - response.config.requestTimeStamp;

                response.config.requestTime = time;

                return response;
            }
        };
    });
});
