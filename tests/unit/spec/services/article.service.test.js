define([
    'angular-mocks',
    'js/services/_loader'
], function () {
    describe('Article service', function () {

        beforeEach(function () {
            module('app.services');
            inject(function (_articleFactory_, _$httpBackend_) {
                articleFactory = _articleFactory_;
                $httpBackend = _$httpBackend_;
            })
        });

        it('tests that the articleFactory.getArticles() makes the call to api', function () {
            var expected = {
                data:[{title: 'adsas'}],
                status: 200
            };
            // here we set our fake-api response
            $httpBackend.expectGET('http://localhost:3000/api/v1/article').respond(function () {
                return  [expected.status , expected.data ];
            });

            var result;
            // call is made
            articleFactory.getArticles().then(function (response) {
                result = response;
            });
            $httpBackend.flush();
            // compares that result from the factory method is equal to the expected one
            expect(result.status).toEqual(expected.status);
            expect(result.data).toEqual(expected.data);
        });
    });
});