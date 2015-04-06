define([
    'angular-mocks',
    'js/filters/_loader'
], function () {
    describe('Reverse filter test', function () {
        var reverseFilter;
        beforeEach(function () {
            module('app.filters');
            inject(function ($filter) {
                reverseFilter = $filter('reverseFilter');
            })
        });
        it('should reverse given text', function () {
            expect(reverseFilter('text')).toBe('txet');
        })
    });
})