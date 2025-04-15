import {
  BurgerTestId,
  IngredientTestId,
  ModalTestId,
  OrderTestId,
  ProfileTestId,
} from '../../src/shared/const/test-ids'
import type {} from 'cypress'

describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    )
    cy.visit('/')
    cy.wait('@getIngredients')
  })

  it('adds ingredients to constructor via drag and drop', () => {
    // Add bun
    cy.testId(BurgerTestId.Ingredient)
      .contains('булка')
      .first()
      .trigger('dragstart')
    cy.testId(BurgerTestId.DropArea).trigger('drop')

    // Verify bun added
    cy.testId(BurgerTestId.TopBun).should('exist').and('be.visible')
    cy.testId(BurgerTestId.BottomBun).should('exist').and('be.visible')

    // Add 2 random fillings
    cy.testId(BurgerTestId.Ingredient)
      .not(':contains("булка")')
      .then(($list) => {
        const index1 = Math.floor(Math.random() * $list.length)
        const index2 = (index1 + 1) % $list.length
        cy.wrap($list[index1]).trigger('dragstart')
        cy.testId(BurgerTestId.DropArea).trigger('drop')
        cy.wrap($list[index2]).trigger('dragstart')
        cy.testId(BurgerTestId.DropArea).trigger('drop')
      })

    // Check that at least 2 fillings are present
    cy.testId(BurgerTestId.BurgerIngredient)
      .should('have.length.at.least', 2)
      .and('be.visible')
  })

  it('opens and closes ingredient modal window', () => {
    cy.testId(BurgerTestId.Ingredient).first().click()
    cy.waitForModal()
    cy.testId(ModalTestId.Modal).should('be.visible')
    cy.testId(IngredientTestId.Details).should('be.visible')
    cy.testId(IngredientTestId.Name).should(
      'have.text',
      'Краторная булка N-200i'
    )
    cy.testId(IngredientTestId.Nutrients)
      .children()
      .should('have.length.at.least', 3)
      .and('be.visible')
    cy.testId(ModalTestId.Close).should('exist').click()
    cy.waitForModal()
    cy.testId(ModalTestId.Modal).should('not.exist')
  })

  it('opens and closes modal via overlay click', () => {
    cy.testId(BurgerTestId.Ingredient).first().click()
    cy.waitForModal()
    cy.testId(ModalTestId.Modal).should('be.visible')
    cy.testId(ModalTestId.Overlay)
      .should('exist')
      .click(50, 50, { force: true })
    cy.waitForModal()
    cy.testId(ModalTestId.Modal).should('not.exist')
  })

  it('places order', () => {
    // Add bun
    cy.testId(BurgerTestId.Ingredient)
      .contains('булка')
      .then(($list) => {
        const index = Math.floor(Math.random() * $list.length)
        cy.wrap($list[index]).trigger('dragstart')
        cy.testId(BurgerTestId.DropArea).trigger('drop')
      })

    // Add filling
    cy.testId(BurgerTestId.Ingredient)
      .not(':contains("булка")')
      .then(($list) => {
        const index = Math.floor(Math.random() * $list.length)
        cy.wrap($list[index]).trigger('dragstart')
        cy.testId(BurgerTestId.DropArea).trigger('drop')
      })

    // Click "Place Order"
    cy.testId(BurgerTestId.OrderButton).click()
    cy.waitForModal()

    // Simulate login
    cy.testId(ModalTestId.Modal).should('exist')
    cy.testId(ProfileTestId.LoginForm).should('be.visible')
    cy.testId(ProfileTestId.Email).type('testEmail@expemple.com')
    cy.testId(ProfileTestId.Password).type('testPassword')
    cy.testId(ProfileTestId.SubmitButton).click()
    cy.intercept('POST', 'login', { fixture: 'login.json' }).as('login')
    cy.wait('@login').its('request.body').should('deep.equal', {
      email: 'testEmail@expemple.com',
      password: 'testPassword',
    })
    cy.waitForModal()
    cy.testId(ModalTestId.Modal).should('not.exist')

    // Confirm order placement
    cy.testId(BurgerTestId.OrderButton).click()
    cy.intercept('POST', 'orders', { fixture: 'orders-accept.json' }).as(
      'order'
    )
    cy.wait('@order')
    cy.waitForModal()

    cy.testId(OrderTestId.OrderAccepted).should('be.visible')
    cy.testId(OrderTestId.OrderNumber).should('have.text', '74576')
  })
})
