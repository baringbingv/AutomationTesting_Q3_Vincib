describe('Login OrangeHRM', () => {
  
  it('TC01 - Login dengan username invalid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('input[name="username"]').type('adminvinci');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Assertion
    cy.get('.oxd-alert-content-text').should(($message) => {
      expect($message.text()).to.contain('Invalid credentials');
    });

    cy.url().should('include', '/auth/login');
  });
  
});