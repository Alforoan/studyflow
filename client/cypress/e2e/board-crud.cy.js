/* eslint-disable cypress/no-unnecessary-waiting */
describe("User board CRUD operations", () => {
  before(() => {
    // login once before any tests in this describe block
    cy.login(); // Custom command for logging in
  });
  

  it("Should be able to create a board, verifyit exists, change name on it, then delete it", () => {
    // Create new board
    cy.contains("Create New Board").click();
    cy.get('input[placeholder="Board Name"]').type("New Board Test");
    cy.contains("Create New Board").click();

    // Wait for 3 seconds
    cy.wait(3000);

    // Click the Home link
    cy.contains("Home").click();

    cy.contains("New Board Test").click();
    cy.contains("Edit").click();

    // Wait for 3 seconds
    cy.wait(3000);

    cy.get('input[value="New Board Test"]').type(" edited");
    cy.contains("Save").click();
    cy.contains("New Board Test edited").click();

    // Wait for 3 seconds
    cy.wait(3000);

    // Click the Home link
    cy.contains("Home").click();

    // Delete the created board created
    cy.contains("New Board Test edited").parent()
      .find('svg[aria-label="Delete board"]').click();

    cy.contains('button', 'Delete').click();

    // Verify the board is deleted
    cy.contains("New Board Test edited").should("not.exist");

    // Wait for 3 seconds
    cy.wait(3000);

    // Log out and assert redirection to Landing page
    cy.contains("Log out").click();
    cy.contains("Sign Up Here").should("exist");
  });
});
