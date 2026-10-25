describe('Login OrangeHRM', () => {

    it('TC10 - Login dengan spasi di awal username', () => {
    // Action
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type(' Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Assertion
    cy.get('.oxd-alert-content-text')
        .should('be.visible')
        .and('contain', 'Invalid credentials');

    cy.url().should('include', '/auth/login');
    });

});