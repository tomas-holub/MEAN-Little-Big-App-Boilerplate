define([
    'angular-mocks',
    'js/services/_loader'
], function () {
    describe('User service', function () {

        beforeEach(function () {
            module('app.services');
            inject(function (_UserService_, _$httpBackend_, _CONFIG_) {
                UserService = _UserService_;
                $httpBackend = _$httpBackend_;
                CONFIG = _CONFIG_;
            })
        });

        it('tests that the UserService.get() makes the call to api', function () {
            var expected = {
                data: [{user: 'John'}],
                status: 200
            };
            // here we set our fake-api response
            $httpBackend.expectGET('/api/v1/users').respond(function () {
                return [expected.status, expected.data];
            });

            var result;
            // call is made
            UserService.get().then(function (response) {
                result = response;
            });
            $httpBackend.flush();
            // compares that result from the service method is equal to the expected one
            expect(result.status).toEqual(expected.status);
            expect(result.data).toEqual(expected.data);
        });
    });
});