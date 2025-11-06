import Login from "../support/pageObjects/loginPage";
import loginData from "../fixtures/loginData.json";

describe("Login OrangeHRM with POM", () => {
  beforeEach(() => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    cy.wait(1500);
  });
  it("TC_001 Login with valid credential", () => {
    const ln = new Login();
    cy.intercept(
      "GET",
      "**/web/index.php/api/v2/dashboard/employees/action-summary"
    ).as("loginRequest");
    ln.setUserName(loginData.validUsername);
    ln.setPassword(loginData.validPassword);
    ln.clickSubmit();
    ln.verifyLogin();
    cy.wait("@loginRequest");
  });
  it("TC_002 Login without username", () => {
    const ln = new Login();
    ln.setPassword(loginData.validPassword);
    ln.clickSubmit();
    cy.get(".oxd-input-field-error-message").should("contain", "Required");
  });
  it("TC_003 Login without password", () => {
    const ln = new Login();
    ln.setUserName(loginData.validUsername);
    ln.clickSubmit();
    cy.get(".oxd-input-field-error-message").should("contain", "Required");
  });
  it("TC_004 Login with wrong password", () => {
    const ln = new Login();
    cy.intercept("POST", "**/web/index.php/auth/validate").as(
      "loginRequestPost"
    );
    ln.setUserName(loginData.validUsername);
    ln.setPassword(loginData.invalidPassword);
    ln.clickSubmit();
    cy.wait("@loginRequestPost");
  });
  it("TC_005 Login with wrong username", () => {
    const ln = new Login();
    cy.intercept("POST", "**/web/index.php/auth/validate").as(
      "loginRequestPost"
    );
    ln.setUserName(loginData.invalidUsername);
    ln.setPassword(loginData.validPassword);
    ln.clickSubmit();
    cy.wait("@loginRequestPost");
  });
  it("TC_006 Login with incorrect credential", () => {
    const ln = new Login();
    cy.intercept("POST", "**/web/index.php/auth/validate").as(
      "loginRequestPost"
    );
    ln.setUserName(loginData.invalidUsername);
    ln.setPassword(loginData.invalidPassword);
    ln.clickSubmit();
    cy.wait("@loginRequestPost");
  });
});
