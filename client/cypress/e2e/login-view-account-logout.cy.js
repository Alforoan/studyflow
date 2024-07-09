/* eslint-disable cypress/no-unnecessary-waiting */
describe("Landing, Home, and Account Pages", () => {
  before(() => {
    // Perform login once before any tests in this describe block
    cy.login(); // Custom command for logging in
    cy.visit("http://localhost:5173/home"); // Visit home page after login
  });

  it("Creates a new board on Home Page then goes to Account page then logs out", () => {
    // Wait for 1 second
    cy.wait(1000);

    // Create a new board
    cy.contains("Create Board").click();
    cy.get('input[placeholder="Board Name"]').type("New Board");
    cy.contains("Create Board").click();

    // Wait for 3 seconds
    cy.wait(3000);

    // Assert the new board exists
    cy.contains("New Board").should("exist");

    // Wait for 2 seconds
    cy.wait(2000);

    // Navigate back to home page explicitly
    cy.visit("http://localhost:5173/home");

    // Wait for 2 seconds
    cy.wait(2000);

    // Click on Account link
    cy.contains("Account").click();

    // Wait for 2 seconds
    cy.wait(2000);

    // Scroll down slowly to show all of the page
    cy.scrollTo("bottom", { easing: "linear", duration: 2000 });

    // Wait for 1 seconds
    cy.wait(1000);

    // Wait for elements to appear before asserting
    cy.contains("Your Templates").should("exist");
    cy.contains("Account Actions").should("exist");

    // Log out and assert redirection to home page
    cy.contains("Log out").click();
    cy.url().should("include", "/");
  });
});
