beforeEach(() => {
  cy.visit("https://opensource-demo.orangehrmlive.com/");
});

it("Login with valid credential", () => {
  cy.get('input[name="username"]').type("Admin");
  cy.get('input[name="password"]').type("admin123");
  cy.get('button[type="submit"]').click();
  cy.url().should("include", "/dashboard");
  cy.get(".oxd-topbar-header-breadcrumb").should("contain", "Dashboard");
});

it("Login without username", () => {
  cy.get('input[name="password"]').type("admin123");
  cy.get('button[type="submit"]').click();
  cy.get(".oxd-input-group__message").should("contain", "Required");
});

it("Login without password ", () => {
  cy.get('input[name="username"]').type("Admin");
  cy.get('button[type="submit"]').click();
  cy.get(".oxd-input-group__message").should("contain", "Required");
});

it("Login with wrong password", () => {
  cy.get('input[name="username"]').type("Admin");
  cy.get('input[name="password"]').type("wrongpassword");
  cy.get('button[type="submit"]').click();
  cy.get(".oxd-alert-content").should("contain", "Invalid credentials");
});

it("Login with wrong username", () => {
  cy.get('input[name="username"]').type("wrongusername");
  cy.get('input[name="password"]').type("admin123");
  cy.get('button[type="submit"]').click();
  cy.get(".oxd-alert-content").should("contain", "Invalid credentials");
});

it("Login with incorrect credentials", () => {
  cy.get('input[name="username"]').type("InvalidUser");
  cy.get('input[name="password"]').type("wrongpassword");
  cy.get('button[type="submit"]').click();
  cy.get(".oxd-alert-content").should("contain", "Invalid credentials");
});

it("Logout after login succes", () => {
  cy.get('input[name="username"]').type("Admin");
  cy.get('input[name="password"]').type("admin123");
  cy.get('button[type="submit"]').click();
  cy.url().should("include", "/dashboard");
  cy.get(".oxd-userdropdown-tab").click();
  cy.contains("Logout").click();
});

Cypress.Commands.add("login", (username, password) => {
  cy.visit("https://opensource-demo.orangehrmlive.com/");
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should("include", "/dashboard");
});
