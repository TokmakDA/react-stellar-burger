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

  it('добавляет ингредиенты в конструктор через drag and drop', () => {
    // Добавляем булку
    cy.testId(BurgerTestId.Ingredient)
      .contains('булка')
      .first()
      .trigger('dragstart')
    cy.testId(BurgerTestId.DropArea).trigger('drop')

    // Проверяем булки
    cy.testId(BurgerTestId.TopBun).should('exist').and('be.visible')
    cy.testId(BurgerTestId.BottomBun).should('exist').and('be.visible')

    // Добавляем 2 случайные начинки
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

    // Проверяем, что в списке 2 начинки
    cy.testId(BurgerTestId.BurgerIngredient)
      .should('have.length.at.least', 2)
      .and('be.visible')
  })

  it('открытие и закрытие модального окна с описанием ингредиента', () => {
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

  it('открытие и закрытие модального окна по оверлей', () => {
    cy.testId(BurgerTestId.Ingredient).first().click()
    cy.waitForModal()
    cy.testId(ModalTestId.Modal).should('be.visible')
    cy.testId(ModalTestId.Overlay)
      .should('exist')
      .click(50, 50, { force: true })
    cy.waitForModal()
    cy.testId(ModalTestId.Modal).should('not.exist')
  })

  it('Оформление заказа', async () => {
    // Добавляем булку
    cy.testId(BurgerTestId.Ingredient)
      .contains('булка')
      .then(($list) => {
        const index = Math.floor(Math.random() * $list.length)
        cy.wrap($list[index]).trigger('dragstart')
        cy.testId(BurgerTestId.DropArea).trigger('drop')
      })

    // Добавляем начинку
    cy.testId(BurgerTestId.Ingredient)
      .not(':contains("булка")')
      .then(($list) => {
        const index = Math.floor(Math.random() * $list.length)
        cy.wrap($list[index]).trigger('dragstart')
        cy.testId(BurgerTestId.DropArea).trigger('drop')
      })

    cy.testId(BurgerTestId.OrderButton).click()
    cy.waitForModal()

    // Авторизация
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

    // Оформляем заказ
    cy.testId(BurgerTestId.OrderButton).click()
    cy.intercept('POST', 'orders', { fixture: 'orders-accept.json' })
    cy.wait('@order')
    cy.waitForModal()

    cy.testId(OrderTestId.OrderAccepted).should('be.visible')
    cy.testId(OrderTestId.OrderNumber).should('have.text', '74576')
  })
})
