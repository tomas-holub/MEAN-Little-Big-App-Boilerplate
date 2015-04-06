define(['angular-mocks', 'js/directives/_loader'], function(){

    describe('button directive', function(){
        var elm, scope;
        beforeEach(function(){
            module('app.directives');
            inject(function($rootScope, $compile){
                elm = angular.element('<div button>ooo</div>');
                scope = new $rootScope;
                $compile(elm)(scope);
                scope.$digest();
            });

            it('should find button', function(){
                var search = elm.find('button');
                expect(search).toBeTruthy();
            })
        });
    });


});