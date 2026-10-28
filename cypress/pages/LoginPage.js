
import { LOGIN_URL } from '../data/loginData';

class LoginPage {
  visit() {
    cy.visit(LOGIN_URL, { timeout: 120000 });
  }

  getUsernameField() {
    return cy.get('input[name="username"]');
  }

  getPasswordField() {
    return cy.get('input[name="password"]');
  }

  getLoginButton() {
    return cy.get('button[type="submit"]');
  }

  enterUsername(username) {
    this.getUsernameField().clear().type(username);
  }

  enterPassword(password) {
    this.getPasswordField().clear().type(password);
  }

  clickLogin() {
    this.getLoginButton().click();
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }

  getErrorMessages() {
    return cy.get('.oxd-input-field-error-message');
  }

  getLoginAlert() {
    return cy.get('.oxd-alert-content-text');
  }

  clickForgotPassword() {
    cy.contains('Forgot your password?').click();
  }

  getDashboardBreadcrumb() {
    return cy.get('.oxd-topbar-header-breadcrumb');
  }
}

export default new LoginPage();
