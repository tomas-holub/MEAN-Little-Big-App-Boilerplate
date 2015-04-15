define([
    'app'
], function (app) {

    app.constant("APPLICATION", {
        name: 'Boilerplate'
    });
    //app.constant("CONFIG", {
    //    apiBase: '/api/v1/'
    //});


    app.run(['$rootScope', '$location', 'AuthService', '$state', function ($rootScope, $location, AuthService, $state) {

        var nonAuthRoutes = ['app.welcome', 'app.sign_in', 'app.sign_up'];

        var isAuthedFreeRoute = function (route) {
            for (var i = 0; i < nonAuthRoutes.length; i++) {
                if (nonAuthRoutes[i] === route) {
                    return true;
                }
            }
            return false;
        }


        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (!isAuthedFreeRoute(toState.name) && !AuthService.isLoggedIn()) {
                $location.url('/signin');
            }
        });

    }]);


    app.config(['$stateProvider', '$urlRouterProvider', '$templateCacheProvider', function ($stateProvider, $urlRouterProvider, $templateCacheProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('app', {
                url: '/',
                abstract: true,
                views: {
                    'header': {
                        templateProvider: ['$templateCache', 'AuthService', function ($templateCache, AuthService) {
                            if (AuthService.isLoggedIn()) {
                                return $templateCache.get('auth-header.html');
                            } else {
                                return $templateCache.get('header.html');
                            }
                            ;
                        }],
                        controller: ['$scope', 'AuthService', '$state', function ($scope, AuthService, $state) {
                            $scope.logout = function () {
                                AuthService.logout().then(function () {
                                    $state.go('app.welcome', null, {reload: true});
                                });
                            }
                        }]
                    },
                    'content': {
                        templateProvider: ['$templateCache', function ($templateCache) {
                            return $templateCache.get('content.html');
                        }]
                    },
                    'footer': {
                        templateProvider: ['$templateCache', function ($templateCache) {
                            return $templateCache.get('footer.html');
                        }]
                    }
                }
            })
            .state('app.welcome', {
                url: '',
                views: {
                    'content@': {
                        templateProvider: ['$templateCache', function ($templateCache) {
                            return $templateCache.get('partial-welcome.html');
                        }]
                    }
                }
            })
            .state('app.sign_up', {
                url: 'signup',
                views: {
                    'content@': {
                        templateProvider: ['$templateCache', function ($templateCache) {
                            return $templateCache.get('partial-register.html');
                        }],
                        controller: 'RegisterController as register'
                    }
                }
            })
            .state('app.sign_in', {
                url: 'signin',
                views: {
                    'content@': {
                        templateProvider: ['$templateCache', function ($templateCache) {
                            return $templateCache.get('partial-login.html');
                        }],
                        controller: 'LogInController as login'
                    }
                }
            })
            .state('app.profile', {
                url: 'profile/:id',
                views: {
                    'content@': {
                        templateProvider: ['$templateCache', function ($templateCache) {
                            return $templateCache.get('partial-profile.html');
                        }],
                        controller: 'ProfileController as profile'
                        //resolve: {
                        //    'users': ['UserService', '$q', function (UserService, $q) {
                        //      //  console.log($q.reject('hohohohoo'));
                        //        return UserService.getUserById();
                        //    }]
                        //}
                    }
                }
            })
    }]);

    //app.config(['$provide', function ($provide) {
    //    $provide.decorator('tom', ['$delegate', function ($delegate) {
    //        $delegate.say = function (greet) {
    //            console.log(greet);
    //        };
    //        $delegate.greet = function () {
    //            console.log('chachaa');
    //        };
    //        return $delegate;
    //    }]);
    //}]);

    app.config(['$httpProvider', function ($httpProvider) {

        //$httpProvider.interceptors.push('requestRejectorInterceptor');
        //$httpProvider.interceptors.push('requestRecovererInterceptor');
        $httpProvider.interceptors.push('TimestampInterceptor');
        $httpProvider.interceptors.push('AuthInterceptor');
    }]);


    //app.constant("RESOLVE", {
    //    main: {
    //        'articles': ['articleFactory', '$q', function (articleFactory, $q) {
    //            console.log($q.reject('hohohohoo'));
    //            return articleFactory.getArticles();
    //        }],
    //        "accommodation": ['$q', '$timeout', function ($q, $timeout) {
    //            var myFriend = $q.defer();
    //            $timeout(function () {
    //                myFriend.resolve({
    //                    hotelName: function () {
    //                        return "My Friend's friend's hotel";
    //                    },
    //                    roomNo: function () {
    //                        return "404";
    //                    }
    //                });
    //            }, 5000);
    //            return myFriend.promise;
    //        }]
    //
    //    }
    //});
});