define([
    'angular-mocks',
    'ngStorage',
    'js/services/_loader'
], function () {
    describe('Authentication service', function () {

        beforeEach(function () {
            module('app.services');
            inject(function (_AuthService_, _$httpBackend_, _CONFIG_) {
                AuthService = _AuthService_;
                $httpBackend = _$httpBackend_;
                CONFIG = _CONFIG_;
            })
        });

        it('tests that the AuthService.register() makes the call to api', function () {
            var expected = {
                data: [{
                    email: 'jane@red.com'
                }],
                status: 201
            };
            $httpBackend.expectPOST('/api/v1/users').respond(function () {
                return [expected.status, expected.data];
            });

            var result;
            AuthService.register().then(function (response) {
                result = response;
            });
            $httpBackend.flush();
            expect(result.status).toEqual(expected.status);
            expect(result.data).toEqual(expected.data);
        });

        it('tests that the AuthService.login() makes the call to api with valid result', function () {
            var result;
            var expected = {
                data: {
                    token: '1234'
                },
                status:200
            };
            $httpBackend.expectPOST('/api/v1/login').respond(function () {
                return [expected.status, expected.data];
            });

            AuthService.login().then(function (response) {
                result = response;
            }, function(err){
                console.log(err);
            });
            $httpBackend.flush();
            expect(result.status).toEqual(expected.status);
            expect(result.data).toEqual(expected.data);
        });

        it('tests that the AuthService.login() makes the call to api with ERROR result', function () {
            var result;
            var expected = {
                data: {},
                status:200
            };
            $httpBackend.expectPOST('/api/v1/login').respond(function () {
                return [expected.status, expected.data];
            });

            AuthService.login().then(function (response) {
            }, function(err){
                result = err;
            });
            $httpBackend.flush();
            expect(result).toEqual('Missing authentication token');
        });
    });
});