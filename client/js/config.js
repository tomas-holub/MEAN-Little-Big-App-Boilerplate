/**
 * Place to config main App module
 */
define([
    'app'
], function (app) {

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
                        controller: 'ProfileController as profile',
                        resolve: {
                            'me': ['AuthService', '$q', function (AuthService, $q) {
                                // ui-router waits until the promise is resolved and returns its result
                                return AuthService.getMe();
                            }]
                        }
                    }
                }
            })
    }]);

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('TimestampInterceptor');
        $httpProvider.interceptors.push('AuthInterceptor');
    }]);

});