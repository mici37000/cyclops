/// <reference types="cypress" />

// Parent commands
Cypress.Commands.add('getByData', (selector: string) => {
  return cy.get(`[data-test=${selector}]`)
});

declare namespace Cypress {
  interface Chainable {
    getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>
  }
}
