/* eslint-disable cypress/no-unnecessary-waiting */
describe("User checks out account page", () => {
  before(() => {
    // login once before any tests in this describe block
    cy.login(); // Custom command for logging in
  });

  it("Should be able to navigate to all buttons and links in the navbar", () => {
    // Naviagte to Template page
    cy.contains("Find A Template").click();
    cy.contains("Software Patterns").should("exist");

    // Naviagte to Create New Board page
    cy.contains("Create New Board").click();
    cy.contains("Create Board").should("exist");

    // Naviagte to the Account page
    cy.get('[aria-label="user icon"]').click();
    cy.contains("Account").should("exist");
    cy.contains("Account").click();
    cy.contains("Reset Password").should("exist");


    // // Naviagte back Home and Log out
    cy.get('[aria-label="home icon"]').click();
    cy.get('[aria-label="user icon"]').click();
    cy.contains("Logout").should("exist");
    cy.contains("Logout").click();
    cy.contains("Get Started with StudyFlow").should("exist");
  });
});

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
    cy.contains("Get Started with StudyFlow").should("exist");
  });
});

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
    cy.contains("Create Board").click();

    // Wait for 3 seconds
    cy.wait(3000);

    cy.contains("New board w/ card").wait(2000);

    cy.contains("Create New Card").click();

    cy.get('#cardName').type('Test Card');

    // Wait for 3 seconds
    cy.wait(3000);
    cy.contains("Notes:").next("textarea").type("These are some notes!");
    cy.get(".chakra-numberinput").type("5");

    cy.get('input[placeholder="Add checklist item"]').type("www.YouTube.com");
    cy.contains("Add").click();
    ('input[placeholder="Card Name"]');
    cy.contains("Create Card").click();

    cy.contains("Test Card").click();
    cy.contains("Edit").click();
    cy.contains("Notes:").next("textarea").type(" These some MORE notes!");
    cy.contains("Save").click();
    cy.contains("Close").click();
    cy.contains("Test Card").click();
    cy.contains("Delete").click();
    cy.contains("Delete").click();
    cy.contains("button", "Delete").click();

    // Wait for 5 seconds
    cy.wait(5000);

    cy.get('[aria-label="home icon"]').click();

    // Delete the downloaded template
    cy.contains("New board w/ card").parent()
    .find('[aria-label="Delete Template"]').click();

    cy.contains('button', 'Delete').click();

    // Verify the template is deleted
    cy.contains("New board w/ card").should("not.exist");

    // Log out and assert redirection to Landing page
    cy.get('[aria-label="user icon"]').click({ force: true });
    cy.contains("Logout").should("exist");
    cy.contains("Logout").click();
    cy.contains("Get Started with StudyFlow").should("exist");
  });
});

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

    cy.contains("Make Board Public").should("exist");

    // Wait for 5 seconds
    cy.wait(5000);

    cy.get('[aria-label="home icon"]').click({ force: true });

    cy.contains("Find A Template").click();
    cy.contains("Software Patterns").click();
    cy.contains("Save Template").click();
    cy.get('[aria-label="home icon"]').click({ force: true });
    cy.contains("Software Patterns").should("exist");

    // Delete the downloaded template
    cy.contains("Software Patterns").parent()
      .find('[aria-label="Delete Template"]').click();

    cy.contains('button', 'Delete').click();

    // Verify the template is deleted
    cy.contains("Software Patterns").should("not.exist");

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
    cy.contains("Get Started with StudyFlow").should("exist");
  });
});
