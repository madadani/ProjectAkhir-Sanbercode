/// <reference types="cypress" />

describe("API Testing", () => {
  it("Test API Delete User", () => {
    cy.request({
      method: "DELETE",
      url: "https://reqres.in/api/users/2",
      failOnStatusCode: false, // agar tidak langsung gagal kalau status bukan 2xx
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.not.be.null;
    });
  });
});
