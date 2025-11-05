describe("Test login page OrangHRM", () => {
  beforeEach(() => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    cy.wait(2000);
  });
  it("Login with valid credential", () => {
    cy.get('input[placeholder="Username"]').type("Admin");
    cy.get('input[placeholder="Password"]').type("admin123");
    cy.intercept(
      "POST",
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate"
    ).as("loginRequest");
    cy.get('button[type="submit"]').click();
    cy.wait("@loginRequest");
  });

  it("Login without username", () => {
    cy.get('input[placeholder="Password"]').type("admin123");
    cy.intercept(
      "POST",
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate"
    ).as("loginRequest");
    cy.get('button[type="submit"]').click();
    cy.wait("@loginRequest");
  });

  it("Login without password ", () => {
    cy.get('input[placeholder="Username"]').type("Admin");
    cy.intercept(
      "POST",
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate"
    ).as("loginRequest");
    cy.get('button[type="submit"]').click();
    cy.wait("@loginRequest");
  });

  it("Login with wrong password", () => {
    cy.get('input[placeholder="Username"]').type("Admin");
    cy.get('input[placeholder="Password"]').type("wrongpassword");
    cy.intercept(
      "POST",
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate",
      {
        statusCode: 302,
        body: {},
      }
    ).as("loginRequest");
    cy.get('button[type="submit"]').click();
    cy.wait("@loginRequest");
  });

  it("Login with wrong username", () => {
    cy.get('input[placeholder="Username"]').type("wrongusername");
    cy.get('input[placeholder="Password"]').type("admin123");
    cy.intercept(
      "POST",
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate",
      {
        statusCode: 302,
        body: {},
      }
    ).as("loginRequest");
    cy.get('button[type="submit"]').click();
    cy.wait("@loginRequest");
  });

  it("Login with incorrect credentials", () => {
    cy.get('input[placeholder="Username"]').type("InvalidUser");
    cy.get('input[placeholder="Password"]').type("wrongpassword");
    cy.intercept(
      "POST",
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate"
    ).as("loginRequest");
    cy.get('button[type="submit"]').click();
    cy.wait("@loginRequest");
  });

  it("Logout after login succes", () => {
    cy.get('input[placeholder="Username"]').type("Admin");
    cy.get('input[placeholder="Password"]').type("admin123");
    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary"
    ).as("actionSummary");
    cy.get('button[type="submit"]').click();
    cy.wait("@actionSummary");
    cy.url().should("include", "/dashboard");
    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/logout"
    ).as("logoutRequest");
    cy.get(".oxd-userdropdown-tab").click();
    cy.contains("Logout").click();
    cy.wait("@logoutRequest");
  });

  Cypress.Commands.add("login", (username, password) => {
    cy.visit("https://opensource-demo.orangehrmlive.com/");
    cy.get('input[placeholder="Username"]').type(username);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/dashboard");
  });
});
