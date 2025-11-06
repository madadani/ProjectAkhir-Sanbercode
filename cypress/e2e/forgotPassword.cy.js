import ForgotPassword from "../support/pageObjects/forgotPassword";

describe("Forgot Password Features", () => {
  beforeEach(() => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
  });

  it("TC_Navigated_001 - Navigate to Forgot Password page", () => {
    ForgotPassword.clickForgotPasswordLink();
    cy.url().should("include", "/auth/requestPasswordResetCode");
  });

  it("TC_Submit valid_002 - Submit valid username for password reset", () => {
    ForgotPassword.clickForgotPasswordLink();
    ForgotPassword.enterUsername("Admin");
    ForgotPassword.clickResetButton();

    cy.get(".orangehrm-forgot-password-container").should(
      "contain",
      "Reset Password link sent successfully"
    );
  });

  it("TC_Submit empty_003 - Submit empty username", () => {
    ForgotPassword.clickForgotPasswordLink();
    ForgotPassword.clickResetButton();

    cy.get(".oxd-input-field-error-message").should("contain", "Required");
  });
});
