import Login from "../support/pageObjects/loginPage";
import loginData from "../fixtures/loginData";
import DashboardPage from "../support/pageObjects/dashboardPage";
import directoryData from "../fixtures/directoryData.json";

describe("verification directory dashboard", () => {
  beforeEach(() => {
    const ln = new Login();
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    cy.wait(1500);
    ln.setUserName(loginData.validUsername);
    ln.setPassword(loginData.validPassword);
    ln.clickSubmit();
    // ln.verifyLogin();
    cy.intercept(
      "GET",
      "/web/index.php/api/v2/directory//employees?limit=14&offset=0"
    ).as("requestDirectory");
    cy.url().should("include", "/dashboard");
  });
  it("TC_001 - Search user by Employee Name", () => {
    DashboardPage.clickDirectoryMenu(); // Klik menu directory
    cy.wait("@requestDirectory").its("response.statusCode").should("eq", 200);
    DashboardPage.inputEmployeeName(directoryData.employee.employeeName); // input employee name
  });

  it("TC_Directory_002 - Search user by Job Tittle", () => {
    DashboardPage.clickDirectoryMenu(); //Klik Menu Directory
    cy.wait("@requestDirectory").its("response.statusCode").should("eq", 200);
    DashboardPage.selectJobTittle(directoryData.employee.jobTittle); //pilih job title
    DashboardPage.searchEmployee();
  });
});
