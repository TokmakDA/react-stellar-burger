/// <reference types="cypress" />
import './commands'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Выбирает элемент по data-testid
       * @example cy.testId('modal')
       */
      testId(testId: string): Chainable<JQuery<Node>>
      waitForModal(): void
    }
  }
}
