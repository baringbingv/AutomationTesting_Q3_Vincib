describe('Login OrangeHRM', () => {

    it('TC09 - Login dengan password berisi spasi', () => {
    // Action
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('        ');
    cy.get('button[type="submit"]').click();

    // Assertion
    cy.get('input[name="password"]')
        .parent()
        .parent()
        .find('.oxd-input-field-error-message')
        .should('be.visible')
        .and('contain', 'Required');
    });

});