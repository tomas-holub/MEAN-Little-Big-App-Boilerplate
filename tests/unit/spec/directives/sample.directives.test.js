define([
    'angular',
    'js/directives/_loader'
], function(){

    //describe('superhero', function(){
    //
    //    var html, scope, element;
    //
    //    beforeEach(function(){
    //        module('app.directives');
    //        inject(function($rootScope, $compile){
    //            scope   = $rootScope.$new();
    //            html    = '<superhero></superhero>';
    //            element = $compile(html)(scope);
    //            //scope.$digest();
    //        });
    //    });
    //
    //    it('should have text: I am here to save the worlds', function(){
    //        var text = element.text();
    //        expect(text).toBe('i am here to save the worlds');
    //    });
    //
    //
    //});

    describe('enter', function(){

        var scope, html, elem;
        beforeEach(function(){
            module('app.directives');
            inject(function($rootScope, $compile){
                scope = $rootScope.$new();
                html = '<div enter="panel">check me out</div>';
                elem = $compile(html)(scope);
            });
        });

        it('shoudl have text: check me out, on init', function(){
            expect(elem.text()).toBe('check me out');
        });

        it('should have text: i am in, on enter', function(){
            elem.triggerHandler('mouseenter');
            expect(elem.text()).toBe('i am in');
        });

        it('should have a class panel when mouse enter', function(){
            elem.triggerHandler('mouseenter');
            expect(elem.hasClass('panel')).toBeTruthy();
        });

    });




});
