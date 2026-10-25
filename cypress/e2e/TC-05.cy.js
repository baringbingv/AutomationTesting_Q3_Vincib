describe('Login OrangeHRM', () => {

    it('TC05 - Login dengan username dan password kosong', () => {
    // Action
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('button[type="submit"]').click();

    // Assertion
    cy.get('input[name="username"]')
        .parent()
        .parent()
        .find('.oxd-input-field-error-message')
        .should('be.visible')
        .and('contain', 'Required');

    cy.get('input[name="password"]')
        .parent()
        .parent()
        .find('.oxd-input-field-error-message')
        .should('be.visible')
        .and('contain', 'Required');
    });

});