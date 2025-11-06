/// <reference types="cypress" />

describe("Reqres API Testing", () => {
  it("Test API Create User", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users",
      body: {
        name: "Bagas Dwi",
        job: "Leader",
      },
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("name", "Bagas Dwi");
      expect(response.body).to.have.property("job", "Leader");
    });
  });
  it("Test API Register Succesfully", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/register",
      headers: { "x-api-key": "reqres-free-v1" },
      body: {
        email: "eve.holt@reqres.in",
        password: "pistol",
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("id", 4);
      expect(res.body).to.have.property("token", "QpwL5tke4Pnpja7X4");
    });
  });
  it("Test API Register Unsuccesfully", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/register",
      headers: {
        "x-api-key": "reqres-free-v1",
      },
      body: {
        email: "sydney@fife",
      },
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property("error", "Missing password");
    });
  });
});
