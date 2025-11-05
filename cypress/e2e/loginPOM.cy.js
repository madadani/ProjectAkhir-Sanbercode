import Login from "../support/pageObjects/loginPage";

describe("Login OrangeHRM with POM", () => {
  beforeEach(() => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    cy.wait(1500);
  });
  it("TC_001 Login with valid credential", () => {
    const ln = new Login();
    ln.setUserName("Admin");
    ln.setPassword("admin123");
    ln.clickSubmit();
    ln.verifyLogin();
  });
  it("TC_002 Login without username", () => {
    const ln = new Login();
    ln.setPassword("admin123");
    ln.clickSubmit();
  });
  it("TC_003 Login without password", () => {
    const ln = new Login();
    ln.setUserName("Admin");
    ln.clickSubmit();
  });
  it("TC_004 Login with wrong password", () => {
    const ln = new Login();
    ln.setUserName("Admin");
    ln.setPassword("wrong");
    ln.clickSubmit();
  });
  it("TC_005 Login with wrong username", () => {
    const ln = new Login();
    ln.setUserName("wrong");
    ln.setPassword("admin123");
    ln.clickSubmit();
  });
  it("TC_006 Login with incorrect credential", () => {
    const ln = new Login();
    ln.setUserName("wrong");
    ln.setPassword("wrong");
    ln.clickSubmit();
  });
});
