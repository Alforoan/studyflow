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
    cy.contains("Create Board").click();

    // Click the Home link
    cy.get('[aria-label="home icon"]').click({ force: true });


    cy.contains("New Board Test").click();
    cy.contains("Edit").click();

    // Wait for 3 seconds
    cy.wait(3000);

    cy.get('input[value="New Board Test"]').type(" edited");
    cy.contains("Save").click();
    cy.contains("New Board Test edited").click();

    // Click the Home link
    cy.get('[aria-label="home icon"]').click({ force: true });

    // Delete the created board created
    cy.contains("New Board Test edited").parent()
      .find('[aria-label="Delete Template"]').click();

    cy.contains('button', 'Delete').click();

    // Verify the board is deleted
    cy.contains("New Board Test edited").should("not.exist");

    // Wait for 3 seconds
    cy.wait(3000);

    // Log out and assert redirection to Landing page
    cy.get('[aria-label="user icon"]').click();
    cy.contains("Logout").should("exist");
    cy.contains("Logout").click();
    cy.contains("Sign Up Here").should("exist");
  });
});
