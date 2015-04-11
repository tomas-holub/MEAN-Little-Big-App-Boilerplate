define([
    'app'
], function (app) {

    app.constant("APPLICATION", {
        name: 'Boilerplate'
    });
    app.constant("CONFIG", {
        apiBase: 'http://localhost:3000/api/v1/'
    });

    app.config(['$stateProvider', '$urlRouterProvider', '$templateCacheProvider', function ($stateProvider, $urlRouterProvider, $templateCacheProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider

            .state('welcome', {
                url: '/',
                templateProvider: ['$templateCache', function ($templateCache) {
                    return $templateCache.get('partial-welcome.html');
                }]
            })
            .state('sign_up', {
                url: '/signup',
                templateProvider: ['$templateCache', function ($templateCache) {
                    return $templateCache.get('partial-register.html');
                }],
                controller: 'RegisterController as register'
            })
            .state('sign_in', {
                url: '/signin',
                templateProvider: ['$templateCache', function ($templateCache) {
                    return $templateCache.get('partial-login.html');
                }],
                controller: 'LogInController as login'
            })
    }]);

    app.config(['$provide', function ($provide) {
        $provide.decorator('tom', ['$delegate', function ($delegate) {
            $delegate.say = function (greet) {
                console.log(greet);
            };
            $delegate.greet = function () {
                console.log('chachaa');
            };
            return $delegate;
        }]);
    }]);

    app.config(['$httpProvider', function ($httpProvider) {

        //$httpProvider.interceptors.push('requestRejectorInterceptor');
        //$httpProvider.interceptors.push('requestRecovererInterceptor');
        $httpProvider.interceptors.push('timestampInterceptor');
        $httpProvider.interceptors.push('AuthInterceptor');
    }]);


    app.constant("RESOLVE", {
        main: {
            'articles': ['articleFactory', '$q', function (articleFactory, $q) {
                console.log($q.reject('hohohohoo'));
                return articleFactory.getArticles();
            }],
            "accommodation": ['$q', '$timeout', function ($q, $timeout) {
                var myFriend = $q.defer();
                $timeout(function () {
                    myFriend.resolve({
                        hotelName: function () {
                            return "My Friend's friend's hotel";
                        },
                        roomNo: function () {
                            return "404";
                        }
                    });
                }, 5000);
                return myFriend.promise;
            }]

        }
    });
});