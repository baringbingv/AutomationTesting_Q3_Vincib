describe('Login OrangeHRM', () => {

    it('TC08 - Memeriksa tampilan halaman login', () => {
    // Action
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Assertion
    cy.get('.orangehrm-login-branding img').should('be.visible');
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible')
        .and('contain', 'Login');
    cy.contains('Forgot your password?').should('be.visible');
    });

});