describe('Login OrangeHRM', () => {

    it('TC06 - Login dengan password yang berbeda kapitalisasi/case sensitive', () => {
    // Action
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('ADMIN123');
    cy.get('button[type="submit"]').click();

    // Assertion
    cy.get('.oxd-alert-content-text')
        .should('be.visible')
        .and('contain', 'Invalid credentials');

    cy.url().should('include', '/auth/login');
    });

});