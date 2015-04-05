define(['angular-mocks', 'js/services/_loader'], function(){
    describe('Test of Tom service', function(){
        beforeEach(function(){
            module('app.services');
            inject(function(_tom_){
                tom = _tom_;
            });
        });
        it('Should have property greet', function(){
            expect(tom.greet).toEqual(jasmine.any(Function));
        });
        it('greets', function(){
            expect(tom.greet('hi')).toEqual('hi');
        });
    });
});