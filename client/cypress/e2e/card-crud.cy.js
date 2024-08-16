/* eslint-disable cypress/no-unnecessary-waiting */
describe("User card CRUD operations", () => {
  before(() => {
    // login once before any tests in this describe block
    cy.login(); // Custom command for logging in
  });

  it("Should be able to create a board, then a card, then modify the card, then delete the card", () => {
    // Create new board
    cy.contains("Create New Board").click();
    cy.get('input[placeholder="Board Name"]').type("New board w/ card");
    cy.contains("Create New Board").click();

    // Wait for 3 seconds
    cy.wait(3000);

    cy.contains("New board w/ card").wait(2000);

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

    cy.contains("Test Card").click();
    cy.contains("Edit").click();
    cy.contains("Notes:").find("textarea").type(" These some MORE notes!");
    cy.contains("Save").click();
    cy.contains("Close").click();
    cy.contains("Test Card").click();
    cy.contains("Delete").click();
    cy.contains("Delete").click();
    cy.contains("button", "Delete").click();

    // Wait for 5 seconds
    cy.wait(5000);

    cy.contains("Home").click({ force: true });

    // Delete the downloaded template
    cy.contains("New board w/ card").parent()
      .find('svg[aria-label="Delete board"]').click();

    cy.contains('button', 'Delete').click();

    // Verify the template is deleted
    cy.contains("New board w/ card").should("not.exist");

    // Log out and assert redirection to Landing page
    cy.contains("Log out").click({ force: true });
    cy.contains("Sign Up Here").should("exist");
  });
});
