describe('Login OrangeHRM', () => {

    it('TC07 - Login dengan username huruf kecil/case sensitive', () => {
    // Action
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Assertion
    cy.get('.oxd-topbar-header-breadcrumb')
        .should('be.visible')
        .and('contain', 'Dashboard');

    });

});