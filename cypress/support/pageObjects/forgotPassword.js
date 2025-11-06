class ForgotPassword {
  forgotPasswordLink() {
    return cy.contains("Forgot your password?");
  }

  usernameInput() {
    return cy.get("input[name='username']");
  }

  resetButton() {
    return cy.get("button[type='submit']");
  }

  // --- ACTIONS ---
  clickForgotPasswordLink() {
    this.forgotPasswordLink().click();
  }

  enterUsername(username) {
    this.usernameInput().clear().type(username);
  }

  clickResetButton() {
    this.resetButton().click();
  }
}

export default new ForgotPassword();
