describe('Registration page', function () {

    beforeEach(function () {
        browser.get('#/signup');
    });

    it('should find registration form', function () {
        expect(element(by.id('registrationForm')).isPresent()).toBeTruthy();
    });

});