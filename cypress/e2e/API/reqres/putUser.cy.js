/// <reference types="cypress" />

describe("API Testing", () => {
  it("PUT Update User", () => {
    cy.request({
      method: "PUT",
      url: "https://reqres.in/api/users/2",
      headers: {
        "x-api-key": "reqres-free-v1",
      },
      body: {
        name: "Bagas Dwi",
        job: "Project Manager",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("name", "Bagas Dwi");
      expect(response.body).to.have.property("job", "Project Manager");
      expect(response.body).to.have.property("updatedAt");
    });
  });
});
