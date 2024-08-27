/* eslint-disable cypress/no-unnecessary-waiting */
describe("User template CRUD operations", () => {
  before(() => {
    // login once before any tests in this describe block
    cy.login(); // Custom command for logging in
  });
  
  it("Should be able to create a board, create a card, upload that board as a templte, and download a template", () => {
    // Create new board
    cy.contains("Create New Board").click();
    cy.get('input[placeholder="Board Name"]').type("New Board Test");
    cy.contains("Create Board").click();

    cy.contains("Create New Card").click();
    cy.get('#cardName').type("Test Card");

    // Wait for 3 seconds
    cy.wait(3000);
    cy.contains("Notes:").next("textarea").type("These some notes!");
    cy.get(".chakra-numberinput").type("5");

    cy.get('input[placeholder="Add checklist item"]').type("www.YouTube.com");
    cy.contains("Add").click();
    ('input[placeholder="Card Name"]');
    cy.contains("Create Card").click();

    cy.contains("Upload Template").click();

    // Wait for 5 seconds
    cy.wait(5000);

    cy.get('[aria-label="home icon"]').click({ force: true });

    cy.contains("Find A Template").click();
    cy.contains("Sorting Algorithms").click();
    cy.contains("Download Template").click();
    cy.get('[aria-label="home icon"]').click({ force: true });
    cy.contains("Sorting Algorithms").should("exist");

    // Delete the downloaded template
    cy.contains("Sorting Algorithms").parent()
      .find('[aria-label="Delete Template"]').click();

    cy.contains('button', 'Delete').click();

    // Verify the template is deleted
    cy.contains("Sorting Algorithms").should("not.exist");

    // Delete the created board
    cy.contains("New Board Test").parent()
      .find('[aria-label="Delete Template"]').click();

    cy.contains('button', 'Delete').click();

    // Verify the template is deleted
    cy.contains("New Board Test").should("not.exist");

    // Log out and assert redirection to Landing page
    cy.get('[aria-label="user icon"]').click({ force: true });
    cy.contains("Logout").should("exist");
    cy.contains("Logout").click();
    cy.contains("Sign Up Here").should("exist");
  });
});
