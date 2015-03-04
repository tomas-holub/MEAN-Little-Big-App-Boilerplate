describe('', function () {

    beforeEach(module('app'));

    var scope = {};

    beforeEach(function () {
        inject(function ($controller) {
            $controller('TodoController', {$scope: scope});
        });
    });

    it('should define a list object', function () {
        expect(scope.list).toBeDefined();
    });
    it('should define a list object', function () {
        expect(scope.list[0]).toEqual('prvni');
    });
    it('should define a list object', function () {
        expect(scope.list[1]).toEqual('druhej');
    });
    it('should define a list object', function () {
        expect(scope.list[2]).toEqual('treti');
    });

    describe('add function of the controller', function () {

        beforeEach(function () {
            scope.add('ctvrtej')
        });
        it('expects ctvrtej to be in the list', function () {
            expect(scope.list[3]).toEqual('ctvrtej');
        });

    });

});


//describe('MainController', function () {
//    beforeEach(module('app'));
//    var ctrl, scope;
//    // inject the $controller and $rootScope services
//    // in the beforeEach block
//    beforeEach(inject(function ($controller, $rootScope) {
//        // Create a new scope that's a child of the $rootScope
//        scope = $rootScope.$new();
//        // Create the controller
//        ctrl = $controller('MainController', {
//            $scope: scope
//        });
//    }));
//    it('should create $scope.greeting when calling sayHello', function () {
//        expect(scope.greeting).toBeUndefined();
//        scope.sayHello();
//        expect(scope.greeting).toEqual("Hello Ari");
//    });
//    it('should point the scope.test as undefined', function () {
//        expect(scope.test).toBeUndefined();
//
//    });
//})