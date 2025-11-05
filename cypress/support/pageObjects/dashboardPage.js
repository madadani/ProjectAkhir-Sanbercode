class DashboardPage {
  // Selectors
  elements = {
    dashboardHeader: () => cy.get(".oxd-topbar-header-breadcrumb"),
    userDropdown: () => cy.get(".oxd-userdropdown-tab"),
    logoutLink: () => cy.get('a[href="/web/index.php/auth/logout"]'),
    welcomeText: () => cy.get(".oxd-topbar-header-breadcrumb-module"),
    sideMenu: () => cy.get(".oxd-main-menu"),
    quickLaunchIcons: () => cy.get(".orangehrm-dashboard-widget"),
  };

  // Actions
  verifyDashboardDisplayed() {
    cy.url().should("include", "/dashboard");
    this.elements.dashboardHeader().should("be.visible");
    this.elements.dashboardHeader().should("contain.text", "Dashboard");
  }

  logout() {
    this.elements.userDropdown().click();
    this.elements.logoutLink().click();
  }

  verifyUserLoggedIn() {
    this.elements.userDropdown().should("be.visible");
    this.elements.sideMenu().should("be.visible");
  }
}

export default DashboardPage;
