define([
    'angular-mocks',
    'angular-ui-router',
    'js/controllers/_loader',
    'js/services/_loader'
], function () {
    describe('RegisterController test', function () {

        var RegisterController;
        beforeEach(function(){
            module('app.controllers');
            module('app.services');

            AuthServiceMock = jasmine.createSpyObj('AuthService', ['register']);
            stateMock = jasmine.createSpyObj('$state', ['go']);

            inject(function ($controller, $rootScope, $q) {
                scope = $rootScope.$new();
                AuthServiceMock.register.and.returnValue($q.when({status:201}));
                RegisterController = $controller('RegisterController as register', {$scope: scope, AuthService:AuthServiceMock, $state: stateMock});
                scope.$digest();
            })

        });

        it('should have method register', function(){
            expect(scope.register.register).toBeDefined();
        });

        it('should call AuthService.register asynchronously when this.register() is called', function(){
            scope.register.register();
            expect(AuthServiceMock.register).toHaveBeenCalled();
        });

    });

});