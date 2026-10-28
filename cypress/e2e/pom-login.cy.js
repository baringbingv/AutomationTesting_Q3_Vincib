
import LoginPage from '../pages/LoginPage';
import {
  LOGIN_URL,
  DASHBOARD_URL,
  LOGIN_DATA,
} from '../data/loginData';

describe('Login OrangeHRM - Page Object Model', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('TC01 - Login dengan username invalid', () => {
    const data = LOGIN_DATA.invalidUsername;

    LoginPage.login(data.username, data.password);

    LoginPage.getLoginAlert()
      .should('be.visible')
      .and('contain', 'Invalid credentials');

    cy.url().should('include', '/auth/login');
  });

  it('TC02 - Login dengan username dan password valid', () => {
    const data = LOGIN_DATA.valid;

    LoginPage.login(data.username, data.password);

    cy.url().should('include', '/dashboard');
    cy.contains('h6', 'Dashboard').should('be.visible');
  });

  it('TC03 - Login dengan username kosong', () => {
    LoginPage.enterPassword(LOGIN_DATA.valid.password);
    LoginPage.clickLogin();

    LoginPage.getErrorMessages()
      .first()
      .should('be.visible')
      .and('contain', 'Required');
  });

  it('TC04 - Login dengan password kosong', () => {
    LoginPage.enterUsername(LOGIN_DATA.valid.username);
    LoginPage.clickLogin();

    LoginPage.getErrorMessages()
      .last()
      .should('be.visible')
      .and('contain', 'Required');
  });

  it('TC05 - Login dengan username dan password kosong', () => {
    LoginPage.clickLogin();

    LoginPage.getUsernameField()
      .parent()
      .parent()
      .find('.oxd-input-field-error-message')
      .should('be.visible')
      .and('contain', 'Required');

    LoginPage.getPasswordField()
      .parent()
      .parent()
      .find('.oxd-input-field-error-message')
      .should('be.visible')
      .and('contain', 'Required');
  });

  it('TC06 - Login dengan password berbeda kapitalisasi', () => {
    const data = LOGIN_DATA.invalidPasswordCase;

    LoginPage.login(data.username, data.password);

    LoginPage.getLoginAlert()
      .should('be.visible')
      .and('contain', 'Invalid credentials');

    cy.url().should('include', '/auth/login');
  });

  it('TC07 - Login dengan username huruf kecil', () => {
    const data = LOGIN_DATA.lowercaseUsername;

    LoginPage.login(data.username, data.password);

    LoginPage.getDashboardBreadcrumb()
      .should('be.visible')
      .and('contain', 'Dashboard');
  });

  it('TC08 - Memeriksa tampilan halaman login', () => {
    cy.get('.orangehrm-login-branding img').should('be.visible');

    LoginPage.getUsernameField().should('be.visible');
    LoginPage.getPasswordField().should('be.visible');

    LoginPage.getLoginButton()
      .should('be.visible')
      .and('contain', 'Login');

    cy.contains('Forgot your password?').should('be.visible');
  });

  it('TC09 - Memastikan password tersamarkan', () => {
    LoginPage.enterPassword(LOGIN_DATA.valid.password);

    LoginPage.getPasswordField()
      .should('have.attr', 'type', 'password');
  });

  it('TC10 - Login dengan spasi di awal username', () => {
    const data = LOGIN_DATA.leadingSpaceUsername;

    LoginPage.login(data.username, data.password);

    LoginPage.getLoginAlert()
      .should('be.visible')
      .and('contain', 'Invalid credentials');

    cy.url().should('include', '/auth/login');
  });

  it('TC11 - Membuka Dashboard tanpa login', () => {
    cy.visit(DASHBOARD_URL, { timeout: 120000 });

    cy.url().should('include', '/auth/login');
    LoginPage.getUsernameField().should('be.visible');
    LoginPage.getPasswordField().should('be.visible');
  });

  it('TC12 - Membuka halaman reset password', () => {
    LoginPage.clickForgotPassword();

    cy.contains('h6', 'Reset Password').should('be.visible');
    cy.contains('label', 'Username').should('be.visible');

    LoginPage.getUsernameField().should('be.visible');

    cy.contains('button', 'Reset Password').should('be.visible');
    cy.contains('button', 'Cancel').should('be.visible');
  });
});
