// cypress/support/commands.ts
/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
  const auth0Domain = Cypress.env('auth0_domain');
  cy.visit('http://localhost:5173');
  
  // Click "Sign Up Here" to initiate login
  cy.contains('Sign Up Here', { timeout: 10000 }).click();

  // Handle Auth0 login process with cy.origin()
  cy.origin(`https://${auth0Domain}`, () => {
    cy.get('input[name="username"]').type('testuser@mail.com');
    cy.get('input[name="password"]').type('P@ssW)rd!23');
    
    // Target the specific "Continue" button
    cy.contains('button[type="submit"]', 'Continue').click();
  });

  // Ensure the URL includes '/home' after successful login
  cy.url().should('include', '/home');
});

