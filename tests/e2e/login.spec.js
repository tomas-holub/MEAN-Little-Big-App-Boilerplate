describe('Login page', function () {

    beforeEach(function () {
        browser.get('#/signin');
    });

    it('should find login form', function () {
        expect(element(by.id('loginForm')).isPresent()).toBeTruthy();
    });

});



