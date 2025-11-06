class DashboardPage {
  directoryMenu() {
    return cy.get(
      "a.oxd-main-menu-item[href='/web/index.php/directory/viewDirectory']"
    );
  }
  employeeNameInput() {
    return cy.get("input[placeholder='Type for hints...']").eq(0);
  }
  jobTitleDropdown() {
    return cy.get(".oxd-select-text--arrow").eq(0);
  }
  jobTitleOptions() {
    return cy.get(".oxd-select-dropdown .oxd-select-option");
  }
  searchButton() {
    return cy.get("button[type='submit']");
  }

  // ====== ACTIONS ======

  /** Klik menu Directory dari Dashboard */
  clickDirectoryMenu() {
    this.directoryMenu().click();
  }

  /** Input Employee Name pada kolom Search */
  inputEmployeeName(name) {
    this.employeeNameInput().clear().type(name);
  }

  /** Pilih Job Title */
  selectJobTittle(jobTitle) {
    this.jobTitleDropdown().click(); // buka dropdown
    this.jobTitleOptions().contains(jobTitle).click(); // pilih berdasarkan text
  }

  /** Klik tombol Search */
  searchEmployee() {
    this.searchButton().click();
  }
}

export default new DashboardPage();
