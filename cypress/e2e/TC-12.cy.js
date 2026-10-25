describe('Login OrangeHRM', () => {

    it('TC12 - Membuka halaman reset password', () => {
    // Action
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.contains('Forgot your password?').click();

    // Assertion
    cy.contains('h6', 'Reset Password').should('be.visible');
    cy.contains('label', 'Username').should('be.visible');
    cy.get('input[name="username"]').should('be.visible');
    cy.contains('button', 'Reset Password').should('be.visible');
    cy.contains('button', 'Cancel').should('be.visible');
    });

});