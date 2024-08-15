describe("User authentication and navigation through site", () => {
  before(() => {
    // login once before any tests in this describe block
    cy.login(); // Custom command for logging in
  });

  it("Should navigate to the Account page, scroll down, go back home then log out", () => {
    // Click the Account link in navbar
    cy.contains("Account").click();

    // Wait for elements to appear before asserting
    cy.contains("Your Templates").should("exist");
    cy.contains("Account Actions").should("exist");

    // Scroll down slowly to show all of the page
    cy.scrollTo("bottom", { easing: "linear", duration: 2000 });

    // Click the Home link in navbar
    cy.contains("Home").click();

    cy.contains("Home").should("exist");

    // Log out and assert redirection to Landing page
    cy.contains("Log out").click();
    cy.contains("Sign Up Here").should("exist");
  });
});