describe("Login", () => {
  it("should log in successfully", () => {
    cy.visit("http://127.0.0.1:5173/sign-in");
    cy.get('input[name="email"]').type("user2@email.com");
    cy.get('input[name="password"]').type("password");
    cy.get('button[data-testid="signInButton"]').click();
  });
});

describe("Login", () => {
  it("should log in successfully", () => {
    cy.login("user2@email.com", "password");
    // Add your assertions or further test steps here
  });
});
