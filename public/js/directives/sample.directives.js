define(['./_module'], function (directives) {

    directives.directive('myFirstDirective', function () {
        return function (scope, element, attrs, controller) {
            element.text('hello ' + attrs.message);
        }
    });

    directives.config(['$compileProvider', function ($compileProvider) {
        $compileProvider.directive('enter', function () {
            return function (scope, element, attrs, controller) {
                element.bind('mouseenter', function () {
                    element.addClass(attrs.enter);
                    element.text('i am in');
                });
            }
        });
    }]);

    directives.config(['$compileProvider',function ($compileProvider) {
        $compileProvider.directive('leave', function () {
            return function (scope, element, attrs, controller) {
                element.bind('mouseleave', function () {
                    element.text('i am leaving');
                });
            }
        });
    }]);

    directives.directive('kid', function () {
        return {
            scope: {
                done: '&'
            },
            template: '<input type="text" ng-model="chore"/> {{chore}} ' +
            '<div class="button" ng-click="done({tom:chore})"></div>'
        }
    });


    directives.directive('messenger', function () {
        return {
            scope: true,
            template: '<input type="text" ng-model="$parent.message"/><div>{{$parent.message}}</div>'
        };
    });

    directives.directive('task', function () {
        return {
            scope: {
                done: '&'
            },
            template: '<input type="text" ng-model="todo"/>{{todo}}' +
            '<div class="button" ng-click="done({task:todo,mask:todo})">Done!</div>'
        };
    });

    directives.directive('drink', function () {
        return {
            scope: {
                flavour: '=drink'
            },
            template: '<input type="text" ng-model="flavour"/><div>{{flavour}}</div>'
        };
    });

    directives.directive('testik', function () {
        return {
            scope: {},
            bindToController: true,
            template: '<div>{{podivna}}</div>'
        };
    });


    directives.directive('superhero', function () {
        return {
            scope: {},
            controller: ['$scope', function ($scope) {
                $scope.abilities = [];
                this.addSpeed = function () {
                    $scope.abilities.push('speed');
                }
                this.addStrength = function () {
                    $scope.abilities.push('strength');
                }
            }],
            link:function(scope, elem){
                elem.bind("mouseenter", function(){
                    console.log(scope.abilities);
                });
            }
        }
    });

    directives.directive('speed', function () {
        return {
            require: "superhero",
            link: function (scope, elem, attrs, controller) {
                controller.addSpeed();
            }
        }
    });

    directives.directive('strength', function () {
        return {
            require: "superhero",
            link: function (scope, elem, attrs, controller) {
                controller.addStrength();
            }
        }
    });


    directives.directive('template', function(){
        return {
            template: function(tElem, tAttrs){
                console.log(tElem);
                console.log(tAttrs);
            }
        }
    });


    directives.directive('watch', function(){
        return {
            template: '<button ng-click="ang()">ang</button><button id="normal""></button>{{text}}',
            link: function(scope, element) {
                scope.ang = function(){
                    scope.text = "ang";
                }



                document.getElementById('normal').addEventListener('click', function(){
                    console.log('clicked');
                    scope.$apply(function(){
                        scope.text = "normal";
                    });

                })
            }
        }
    })

});