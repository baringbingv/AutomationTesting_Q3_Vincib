describe('Login OrangeHRM', () => {

  it('TC02 - Login dengan username Valid', () => {
    // Action
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Assertion
    cy.url().should('include', '/dashboard');

    cy.contains('h6', 'Dashboard')
      .should('be.visible');
  });

});