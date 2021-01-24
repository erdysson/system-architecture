export function goToUri(uri) {
    return cy.visit(uri);
}

export function getBrowserUrl() {
    return cy.url();
}

export function getLoginBox() {
    return cy.get('.login');
}

export function getUserNameInput() {
    return cy.get('.login').find('input#userName');
}

export function getUserNameError() {
    return cy.get('.login').find('.user-name-error');
}

export function getPasswordInput() {
    return cy.get('.login').find('input#password');
}

export function getPasswordError() {
    return cy.get('.login').find('.password-error');
}

export function getSubmitButton() {
    return cy.get('.login').find('.submit-btn');
}
