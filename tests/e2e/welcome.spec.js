describe('Welcome page', function () {

    beforeEach(function () {
        browser.get('');
    });

    it('should load the home page', function () {
        expect(element(by.id('home')).isPresent()).toBeTruthy();
    });

});