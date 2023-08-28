describe("Verify server is running and accessable", () => {
  it("passes", () => {
    cy.visit("http://127.0.0.1:5173/");
  });
});
describe("Verify CreateRecipePage", () => {
  it("passes", () => {
    cy.visit("http://127.0.0.1:5173/create-recipe");
  });
});
describe("Verify ReadRecipePage", () => {
  it("passes", () => {
    cy.visit("http://127.0.0.1:5173/recipe/Nh5FQ67s17szbHG5wjhz");
  });
});
describe("Verify SearchResultsPage", () => {
  it("passes", () => {
    cy.visit("http://127.0.0.1:5173/search-results");
  });
});
describe("Verify UpdateRecipePage", () => {
  it("passes", () => {
    cy.visit("http://127.0.0.1:5173/update-recipe/Nh5FQ67s17szbHG5wjhz");
  });
});
describe("Verify Sign-in", () => {
  it("passes", () => {
    cy.visit("http://127.0.0.1:5173/sign-in");
  });
});
