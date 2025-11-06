/// <reference types="cypress" />

describe("API Testing", () => {
  it("Test API Single User", () => {
    cy.request("GET", "https://reqres.in/api/users/2").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.not.be.null;
    });
  });
  it("List User", () => {
    cy.request("GET", "https://reqres.in/api/users?page=2").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.not.be.null;
    });
  });
  it("Single User Not Found", () => {
    cy.request("GET", "https://reqres.in/api/users/23").then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.not.be.null;
    });
  });
  it("List <resource>", () => {
    cy.request("GET", "https://reqres.in/api/unknown").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
    });
  });
  it("DELAYED RESPONSE", () => {
    cy.request("GET", "https://reqres.in/api/users?delay=3").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.not.be.null;
      }
    );
  });
});
