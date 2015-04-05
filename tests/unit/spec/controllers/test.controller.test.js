define(['angular-mocks', 'js/controllers/_loader'], function () {

    describe('', function () {
        beforeEach(module('app.controllers'));
        beforeEach(inject(function ($controller, $rootScope, _$location_) {
            scope = $rootScope.$new();
            $location = _$location_;
            $controller('TestCtrl', {$scope: scope, $location: $location});

            scope.$digest();
        }));
        it('should say the scope tom is defined', function() {
            expect(scope.tom).toBeDefined();
        });

    });

});