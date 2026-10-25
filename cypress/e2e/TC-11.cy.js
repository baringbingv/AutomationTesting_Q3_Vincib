describe('Login OrangeHRM', () => {

    it('TC11 - Membuka Dashboard tanpa login', () => {
    // Action
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

    // Assertion
    cy.url().should('include', '/auth/login');
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    });

});