define([
    'angular-mocks',
    'js/controllers/_loader',
    'js/services/_loader'
], function () {
    describe('', function () {

        var MainCtrl;
        beforeEach(function(){
            module('app.controllers');
            module('app.services');

            articleFactoryMock = jasmine.createSpyObj('articleFactory', ['getArticles']);
            tomMock = jasmine.createSpyObj('tom', ['say', 'greet']);

            inject(function ($controller, $rootScope, $q, $injector) {
                scope = $rootScope.$new();
                articleFactoryMock.getArticles.and.returnValue($q.when({}));
                articles = {};
                accommodation = {};
                MainCtrl = $controller('MainCtrl', {$scope: scope, tom: tomMock, articleFactory:articleFactoryMock, articles:articles, accommodation:accommodation});

                scope.$digest();
            })

        });

        it('should have a test of huu', function(){
            expect(MainCtrl.test).toBe('huu');
        });

        it('should say the scope tom is defined', function() {
            expect(scope.libraries).toBeDefined();
        });

    });

});