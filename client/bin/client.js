var app = angular.module('app', []);

//
//var PromiseCtrl = function ($scope, $q, PromiseFactory) {
//    $scope.getMovie = function(id) {
//        PromiseFactory.getMessages(id).then(function(movieData){
//            $scope.movieData = movieData;
//        });
//    };
//};
//PromiseCtrl.$inject = ['$scope', '$q', 'PromiseFactory'];
//app.controller('PromiseCtrl', PromiseCtrl);
//
//
//var PromiseFactory = function ($http, $q) {
//    return {
//        getMessages: function (id) {
//            return $http.get('/api/v1/movies/', {params: {id: id}})
//                .then(
//                function (repsonse) {
//                    return {
//                        title: response.data.title,
//                        cost: response.data.price
//                    }
//                });
//        }
//    };
//};
//PromiseFactory.$inject = ['$http', '$q'];
//app.factory('PromiseFactory', PromiseFactory);


var MyFunc = function () {
    this.name = "default name";
    this.$get = function () {
        //this.name = "new name"
        return "Hello from MyFunc.$get(). this.name = " + this.name;
    };
    return "Hello from MyFunc(). this.name = " + this.name;
};

// returns a new instance of the function
app.service('myService', MyFunc);

// returns the function's return value
app.factory('myFactory', MyFunc);

// returns the output of the function's $get function
app.provider('myProv', MyFunc);

app.config(function (myProvProvider) {
    myProvProvider.name = "chachaa";
})


app.config(function ($controllerProvider) {
    $controllerProvider.register('TestCtrl', function ($scope, $injector, $q) {

        function tom(test, test1) {
            console.log(test);
        }

        $injector.invoke(tom);


        this.test = "ahoj";

        this.names = [{name: "atom"}, {name: "bom"}, {name: "ash"}, {name: "tom"}];

        this.startsWithW = function (item) {
            return /a/i.test(item.name.substring(0, 1));
        };

        $scope.test = this;
    });
});

var MujCtrl = function (a, b, c, d, $q, $timeout) {
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);


    function processLotsOfData(data) {
        var deferred = $q.defer();

        $timeout(function () {
            deferred.notify('In progress')
        }, 0);

        $timeout(function(){
            deferred.resolve('aaa');
        }, 0)
        return deferred.promise;
    };

    var data = ['a', 'b', 'c'];

    processLotsOfData(data)
        .then(function (result) {
console.log(result);
        }, function (error) {
            // error
        }, function (percentComplete) {
            console.log(percentComplete);
        });


};

MujCtrl.$inject = ['$scope', 'myService', 'myFactory', 'myProv', '$q', '$timeout'];

app.controller('MujCtrl', MujCtrl);


app.filter('startsWith', function () {
    return function (items, letter) {
        var exp = new RegExp(letter, 'i');
        return items.filter(function (item) {
            return exp.test(item.name.substring(0, 1));
        });
    }
});


app.config(function ($filterProvider) {
    $filterProvider.register('filt', function () {
        return function (item) {
            return item.toUpperCase();
        }
    })
});


app.factory('test', function () {
    return "hodnota";
});
app.factory('test1', function (test2) {
    return test2.test + "ppp";
});
//
app.service("test2", function (test) {
    this.test = test;
})
//
//app.provider('prd', function(){
//    var type;
//    return {
//        setType: function(val){
//            console.log(val);
//            type = val;
//        },
//        $get: function() {
//            return {
//                text: 'bla' + type
//            };
//        }
//    };
//});
//
//app.constant('val', 10);
//
//app.config(function(prdProvider, val){
//    prdProvider.setType('uuugh');
//});


angular.element(document).ready(function () {
    angular.bootstrap(document, ['app']);
});