const dataTestID = (id: string) => {
	return `[data-testid=${id}]`
}
import { NORMA_API } from '../../src/utils/api'

describe('Constructor', () => {
	beforeEach(() => {
		cy.setCookie('accessToken', 'test-accessToken')
		cy.setCookie('refreshToken', 'test-refreshToken')

		cy.intercept('GET', `${NORMA_API}/ingredients`)

		cy.intercept('GET', `${NORMA_API}/auth/user`, {
			fixture: 'user.json',
		})
		cy.intercept('POST', `${NORMA_API}/orders`, {
			fixture: 'order.json',
		}).as('postOrder')

		cy.visit('http://localhost:3000')
	})

	it('should drag and drop a bun ingredient into constructor', () => {
		cy.get(dataTestID('burger_ingredient')).first().trigger('dragstart')
		cy.get(dataTestID('constructor')).trigger('drop')

		cy.get(dataTestID('constructor_bun'))
			.should('be.visible')
			.should('have.length', 2)
	})

	it('should open modal with ingredient details and close modal', () => {
		cy.get(dataTestID('burger_ingredient')).first().click()
		cy.get(dataTestID('modal')).as('modal')

		cy.get('@modal')
			.should('be.visible')
			.find(dataTestID('modal_title'))
			.should('have.text', 'Детали ингредиента')

		cy.fixture('ingredient-details.json').then(
			({ name, proteins, fat, calories, carbohydrates }) => {
				cy.get('@modal')
					.find(dataTestID('ingredient_name'))
					.should('have.text', name)

				cy.get('@modal')
					.find(dataTestID('ingredient_calories'))
					.should('have.text', calories)

				cy.get('@modal')
					.find(dataTestID('ingredient_proteins'))
					.should('have.text', proteins)
				cy.get('@modal')
					.find(dataTestID('ingredient_fat'))
					.should('have.text', fat)
				cy.get('@modal')
					.find(dataTestID('ingredient_carbohydrates'))
					.should('have.text', carbohydrates)
			}
		)

		cy.get('@modal').find(dataTestID('close_button')).click()
		cy.get(dataTestID('modals')).should('not.be.visible')
	})

	it('should open modal with booking details and close modal', () => {
		cy.get(dataTestID('burger_ingredient')).first().trigger('dragstart')
		cy.get(dataTestID('constructor')).trigger('drop')

		cy.get(dataTestID('button_submit')).click()
		cy.wait('@postOrder')
		cy.get(dataTestID('modal'))
			.as('modal')
			.should('be.visible')
			.find(dataTestID('modal_title'))
			.should('have.text', '')

		cy.fixture('order.json').then(({ order }) => {
			cy.get('@modal')
				.find(dataTestID('order_number'))
				.should('have.text', order.number)
		})

		cy.get('@modal').find(dataTestID('close_button')).click()
		cy.get(dataTestID('modals')).should('not.be.visible')
	})
})
