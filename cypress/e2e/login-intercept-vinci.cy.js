const LOGIN_URL =
  'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

describe('Login OrangeHRM - Intercept', () => {

  it('TC01 - Login dengan username invalid', () => {
    // Intercept #1: POST validate -> redirect 302 kembali ke halaman login
    cy.intercept('POST', '**/web/index.php/auth/validate').as('loginInvalid');

    cy.visit(LOGIN_URL, { timeout: 120000 });

    cy.get('input[name="username"]').type('adminvinci');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginInvalid', { timeout: 60000 }).then((interception) => {
      expect(interception.request.method).to.equal('POST');
      expect(interception.response).to.exist;
      expect(interception.response.statusCode).to.equal(302);
      expect(interception.response.headers.location).to.include('/auth/login');
    });

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');

    cy.url().should('include', '/auth/login');
  });

  it('TC02 - Login dengan username dan password valid', () => {
    // Intercept #2: API shortcuts di dashboard setelah login berhasil
    cy.intercept('GET', '**/web/index.php/api/v2/dashboard/shortcuts').as('dashboardShortcuts');

    cy.visit(LOGIN_URL, { timeout: 120000 });

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@dashboardShortcuts', { timeout: 60000 }).then((interception) => {
      expect(interception.request.method).to.equal('GET');
      expect(interception.response.statusCode).to.equal(200);
    });

    cy.url().should('include', '/dashboard');
    cy.get('h6').should('contain', 'Dashboard');
  });

  it('TC04 - Login dengan password kosong', () => {
    // Intercept #4: file bahasa (i18n) saat halaman login dimuat
    cy.intercept('GET', '**/web/index.php/core/i18n/messages').as('i18n');

    cy.visit(LOGIN_URL, { timeout: 120000 });
    cy.wait('@i18n', { timeout: 60000 }).its('response.statusCode').should('eq', 200);

    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message')
      .last()
      .should('have.text', 'Required');
  });

  it('TC05 - Login dengan username dan password kosong', () => {
    // Intercept #5: dokumen halaman login (status dan content-type)
    cy.intercept('GET', '**/web/index.php/auth/login').as('loginPage');

    cy.visit(LOGIN_URL, { timeout: 120000 });
    cy.wait('@loginPage', { timeout: 60000 }).then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(String(response.headers['content-type'])).to.include('text/html');
    });

    cy.get('button[type="submit"]').click();

    cy.get('input[name="username"]')
      .parent()
      .parent()
      .find('.oxd-input-field-error-message')
      .should('be.visible')
      .and('contain', 'Required');

    cy.get('input[name="password"]')
      .parent()
      .parent()
      .find('.oxd-input-field-error-message')
      .should('be.visible')
      .and('contain', 'Required');
  });

  it('TC07 - Login dengan username huruf kecil/case sensitive', () => {
    // Intercept #7: API time-at-work di dashboard
    cy.intercept('GET', '**/web/index.php/api/v2/dashboard/employees/time-at-work*').as('timeAtWork');

    cy.visit(LOGIN_URL, { timeout: 120000 });

    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@timeAtWork', { timeout: 60000 }).its('response.statusCode').should('eq', 200);

    cy.get('.oxd-topbar-header-breadcrumb')
      .should('be.visible')
      .and('contain', 'Dashboard');
  });

  
    it('TC08 - Memeriksa tampilan halaman login', () => {
    // Intercept request dokumen halaman login
    cy.intercept(
        'GET',
        '**/web/index.php/auth/login'
    ).as('loginPageVisual');

    cy.visit(LOGIN_URL, { timeout: 120000 });

    cy.wait('@loginPageVisual', { timeout: 60000 }).then(({ response }) => {
        expect(response).to.exist;
        expect(response.statusCode).to.eq(200);
    });

    // Assertion tampilan halaman login
    cy.get('.orangehrm-login-branding img')
        .should('be.visible');

    cy.get('input[name="username"]')
        .should('be.visible');

    cy.get('input[name="password"]')
        .should('be.visible');

    cy.get('button[type="submit"]')
        .should('be.visible')
        .and('contain', 'Login');

    cy.contains('Forgot your password?')
        .should('be.visible');
    });

  it('TC11 - Membuka Dashboard tanpa login', () => {
    // Intercept #11: GET dashboard/index -> redirect 302 ke login
    cy.intercept('GET', '**/web/index.php/dashboard/index').as('dashboardNoLogin');

    cy.visit(
      'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index',
      { timeout: 120000 }
    );

    cy.wait('@dashboardNoLogin', { timeout: 60000 }).then(({ response }) => {
      expect(response.statusCode).to.eq(302);
      expect(response.headers.location).to.include('/auth/login');
    });

    cy.url().should('include', '/auth/login');
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
  });

  it('TC12 - Membuka halaman reset password', () => {
    // Intercept #12: halaman request reset password
    cy.intercept('GET', '**/web/index.php/auth/requestPasswordResetCode').as('resetPage');

    cy.visit(LOGIN_URL, { timeout: 120000 });
    cy.contains('Forgot your password?').click();

    cy.wait('@resetPage', { timeout: 60000 }).its('response.statusCode').should('eq', 200);

    cy.contains('h6', 'Reset Password').should('be.visible');
    cy.contains('label', 'Username').should('be.visible');
    cy.get('input[name="username"]').should('be.visible');
    cy.contains('button', 'Reset Password').should('be.visible');
    cy.contains('button', 'Cancel').should('be.visible');
  });

});