import {
    getBrowserUrl,
    getLoginBox, getPasswordError,
    getPasswordInput,
    getSubmitButton, getUserNameError,
    getUserNameInput,
    goToUri
} from './helpers/login.helper';

describe('Initial load', () => {
    it('should redirect to login from "/" if the user does not have credentials', () => {
        goToUri('/');
        getBrowserUrl().should('include', '/login');

        // done();
    });

    it('should redirect to login from any url if the user does not have credentials', () => {
        goToUri('/dashboard');
        getBrowserUrl().should('include', '/login');

        // done();
    });

    it('should render login page properly', () => {
        goToUri('/login');
        getBrowserUrl().should('include', '/login');

        getLoginBox().should('be.visible');

        getUserNameInput().should('be.visible');
        getUserNameInput().should('have.value', '');

        getPasswordInput().should('be.visible');
        getPasswordInput().should('have.value', '');

        getSubmitButton().should('be.visible');
        getSubmitButton().should('be.disabled');

        // done();
    });

    it('submit button state should be managed correctly according to input fields', () => {
        goToUri('/login');

        const wrongUserName = 'xyz';
        const wrongPassword = '123';

        // when input fields are empty, button should be disabled
        getSubmitButton().should('be.disabled');

        // when only userName input is field, button should still be disabled
        getUserNameInput().type(wrongUserName);
        getSubmitButton().should('be.disabled');

        // after typing password too, button should be enabled
        getPasswordInput().type(wrongPassword);
        getSubmitButton().should('not.be.disabled');

        // if the userName is removed, then should be disabled again
        getUserNameInput().clear();
        getSubmitButton().should('be.disabled');

        // if the userName is typed again, then button should be enabled again
        getUserNameInput().type(wrongUserName);
        getSubmitButton().should('not.be.disabled');

        // if the password is removed, then should be disabled again
        getPasswordInput().clear();
        getSubmitButton().should('be.disabled');

        // if the password is typed again, then button should be enabled again
        getPasswordInput().type(wrongPassword);
        getSubmitButton().should('not.be.disabled');

        // done();
    });

    it('should return and display correct error messages according to login credentials', () => {
        goToUri('/login');

        const rightUserName = 'egoekalp';
        const wrongUserName = 'xyz';
        const wrongPassword = '123';

        // send the wrong userName and password
        getUserNameInput().type(wrongUserName);
        getPasswordInput().type(wrongPassword);

        getSubmitButton().click();

        // user name validation message should be displayed
        getUserNameError().should('be.visible');
        getUserNameError().should('have.text', 'username does not exist');

        // send correct userName with wrong password
        getUserNameInput().clear().type(rightUserName);

        getSubmitButton().click();

        // password validation message should be displayed
        getPasswordError().should('be.visible');
        getPasswordError().should('have.text', 'password is incorrect');

        // done();
    });

    it('should login with the correct credentials and see /dashboard', () => {
        goToUri('/login');

        const rightUserName = 'egoekalp';
        const rightPassword = '12345678';

        getUserNameInput().type(rightUserName);
        getPasswordInput().type(rightPassword);

        getSubmitButton().click();

        getBrowserUrl().should('include', '/dashboard');
    });
});
