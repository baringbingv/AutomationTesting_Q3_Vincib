describe('Login OrangeHRM', () => {

    it('TC03 - Login dengan username kosong', () => {
    // Action
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Assertion
    cy.get('.oxd-input-field-error-message')
        .first()
        .should('be.visible')
        .and('contain', 'Required');
    });

});