/* eslint-disable cypress/no-unnecessary-waiting */
describe("User checks out account page", () => {
  before(() => {
    // login once before any tests in this describe block
    cy.login(); // Custom command for logging in
  });

  it("Should be able to navigate to all buttons and links in the navbar", () => {
    // Naviagte to Template page
    cy.contains("Find A Template").click();

    // Wait for 4 seconds
    cy.wait(4000);
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

