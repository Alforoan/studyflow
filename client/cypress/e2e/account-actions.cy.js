/* eslint-disable cypress/no-unnecessary-waiting */
describe("User checks out account page", () => {
  before(() => {
    // login once before any tests in this describe block
    cy.login(); // Custom command for logging in
  });
  
  it("Should be able to navigate to Account page and request a passowrd change and dark mode toggle", () => {
    // Naviagte to Account page
    cy.contains("Account").click();

    // Wait for elements to appear before asserting
    cy.contains("Your Templates").should("exist");
    cy.contains("Account Actions").should("exist");
    cy.contains("Reset Password").should("exist");
    cy.contains("Dark Mode").click();
    cy.contains("Light Mode").click();
   
    // Log out and assert redirection to Landing page
    cy.contains("Log out").click();
    cy.contains("Sign Up Here").should("exist");
  });
});
