import loginPage from "../support/pageObjects/loginPage";
import DashboardPage from "../support/pageObjects/dashboardPage";

describe("verification directory dashboard", () => {
  beforeEach(() => {
    loginPage.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    loginPage.fillUsername(loginData.validUsername);
    loginPage.fillPasswoard(loginData.validPassword);
    loginPage.clikLogin();

    cypress
      .interpect("GET", "/web/index.php/api/v2/directory/emplotyees*")
      .as("requestDirectory");
    cypress.url().should("include", "/dashboard");
  });
  it("TC_001 - Search user by Employee Name", () => {
    DashboardPage.clickDirectoryMenu(); // Klik menu directory
    cy.wait("@requestDirectory").its("response.statusCode").should("eq", 200);
    DashboardPage.inputEmployeeName(directoryData.employee.employeeName); // input employee name
  });

  it("TC_Directory_002 - Search user by Job Tittle", () => {
    DashboardPage.clickDirectoryMenu(); //Klik Menu Directory
    cy.wait("@requestDirectory").its("response.statusCode").should("eq", 200);
    DashboardPage.selectJobTittle(directoryData.employee.jobTitte); //pilih job title
    DashboardPage.searchEmployee();
  });
});
