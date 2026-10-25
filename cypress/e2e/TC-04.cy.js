describe('Login OrangeHRM', () => {

    it('TC04 - Login dengan password kosong', () => {
    // Action
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

    // Assertion
    cy.get('.oxd-input-field-error-message')
        .last()
        .should(($message) => {
        expect($message.text()).to.equal('Required');
        });
    });

});