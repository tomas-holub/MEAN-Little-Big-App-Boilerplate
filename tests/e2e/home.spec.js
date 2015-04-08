describe('boilerplate home page', function () {

    beforeEach(function () {
        browser.get('');
    });

    it('should load the home page', function () {
        expect(element(by.id('home')).isPresent()).toBeTruthy();
    });

    it('should add "ang" when clicked', function () {
        var el = element(by.css('[ng-click="ang()"]'));
        el.click();
        expect(el.getText()).toBe('ang');
    });


    //it('should add a todo', function() {
    //    browser.get('http://www.angularjs.org');
    //    element(by.model('todoText')).sendKeys('write a protractor test');
    //    element(by.css('[value="add"]')).click();
    //
    //    var todoList = element.all(by.repeater('todo in todos'));
    //    expect(todoList.count()).toEqual(3);
    //    expect(todoList.get(2).getText()).toEqual('write a protractor test');
    //});


});