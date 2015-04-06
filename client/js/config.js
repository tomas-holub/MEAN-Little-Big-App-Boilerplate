define([
    'app'
], function (app) {

    app.constant("RESOLVE", {
        main : {
            'articles' : ['articleFactory','$q', function(articleFactory, $q) {
                console.log($q.reject('hohohohoo'));
                return articleFactory.getArticles();
            }],
            "accommodation": ['$q','$timeout', function( $q, $timeout ) {
                var myFriend = $q.defer();
                $timeout(function(){
                    myFriend.resolve({
                        hotelName: function( ) {
                            return "My Friend's friend's hotel";
                        },
                        roomNo: function( ) {
                            return "404";
                        }
                    });
                },5000);
                return myFriend.promise;
            }]

        }
    });
    app.config(['$routeProvider', 'RESOLVE', function($routeProvider, RESOLVE){
        $routeProvider.when('/',  {
            controller: "MainCtrl as main",
            template: "<div button>aaaaaa</div>{{main.test}}",
            resolve: RESOLVE.main

        }).otherwise({template: "aaaaa"});
    }]);


    app.config(['$provide', function($provide){
        $provide.decorator('tom', ['$delegate', function($delegate){
            $delegate.say = function(greet){
                console.log(greet);
            };
            $delegate.greet = function(){
                console.log('chachaa');
            };
            return $delegate;
        }]);
    }]);

    app.config(['$httpProvider', function($httpProvider){

        $httpProvider.interceptors.push('requestRejectorInterceptor');
        $httpProvider.interceptors.push('requestRecovererInterceptor');
        $httpProvider.interceptors.push('timestampInterceptor');
    }]);
});