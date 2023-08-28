describe("NavMenu", () => {
  beforeEach(() => {
    cy.login("user2@email.com", "password");
  });

  it("should navigate to create recipe page when 'Create Recipe' link is clicked", () => {
    cy.get('a[href="/create-recipe"]').first().click();

    cy.url().should("include", "/create-recipe");
  });

  it("should navigate to user's recipes when 'Your Recipes' link is clicked", () => {
    cy.get('a[data-testid="yourRecipesLink"]').first().click();

    cy.url().should("include", "/");
  });

  it("should navigate to user's favourites when 'Your Favourites' link is clicked", () => {
    cy.get('a[data-testid="yourFavouritesLink"]').first().click();

    cy.url().should("include", "/");
  });
});
