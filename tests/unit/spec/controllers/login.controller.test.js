define([
    'angular-mocks',
    'angular-ui-router',
    'js/controllers/_loader',
    'js/services/_loader'
], function () {
    describe('LogInController test', function () {

        var LoginController;
        beforeEach(function(){
            module('app.controllers');
            module('app.services');

            AuthServiceMock = jasmine.createSpyObj('AuthService', ['login']);
            stateMock = jasmine.createSpyObj('$state', ['go']);

            inject(function ($controller, $rootScope, $q) {
                scope = $rootScope.$new();
                AuthServiceMock.login.and.returnValue($q.when({status:201}));
                LogInController = $controller('LogInController as login', {$scope: scope, AuthService:AuthServiceMock, $state: stateMock});
                scope.$digest();
            })

        });

        it('should have method login', function(){
            expect(scope.login.login).toBeDefined();
        });

        it('should call AuthService.login asynchronously when this.login() is called', function(){
            scope.login.login();
            expect(AuthServiceMock.login).toHaveBeenCalled();
        });

    });

});