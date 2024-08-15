/* eslint-disable cypress/no-unnecessary-waiting */
describe("User board CRUD operations", () => {
  before(() => {
    // login once before any tests in this describe block
    cy.login(); // Custom command for logging in
  });
  
  it("Should be able to create a board, create a card, upload that board as a templte, and download a template", () => {
    // Create new board
    cy.contains("Create New Board").click();
    cy.get('input[placeholder="Board Name"]').type("New Board Test");
    cy.contains("Create New Board").click();

    cy.contains("Create New Card").click();
    cy.contains("Card Name:").find("input").type("Test Card");

    // Wait for 3 seconds
    cy.wait(3000);
    cy.contains("Notes:").find("textarea").type("These some notes!");
    cy.contains("Time").find("input").type("1");

    cy.get('input[placeholder="Add checklist item"]').type("www.YouTube.com");
    cy.contains("Add").click();
    ('input[placeholder="Card Name"]');
    cy.contains("Create Card").click();

    cy.contains("Upload Template").click();

    // Wait for 5 seconds
    cy.wait(5000);

    cy.contains("Home").click();

    cy.contains("Search Templates").click();
    cy.contains("Sorting Algorithms").click();
    cy.contains("Download Template").click();
    cy.contains("Home").click();
    cy.contains("Sorting Algorithms").should("exist");

    cy.get(".Toastify__toast-container")
      .should("be.visible")
      .then(() => {
        cy.get(".Toastify__toast-container .Toastify__close-button").click();
      });

    // Log out and assert redirection to Landing page
    cy.contains("Log out").click();
    cy.contains("Sign Up Here").should("exist");
  });
});
