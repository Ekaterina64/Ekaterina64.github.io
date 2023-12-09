import { expect } from '@jest/globals'
import * as actions from '../../actions/burger-ingredients'

import { ingredientsReducer, initialState } from './burger-ingredients'

describe('Ingredients reducer', () => {
	it('should return initial state', () => {
		expect(ingredientsReducer(undefined, {})).toEqual(initialState)
	})

	it('should set a ingredientsRequest flag', () => {
		expect(
			ingredientsReducer(initialState, actions.getIngredientsReq())
		).toEqual({
			...initialState,
			ingredientsRequest: true,
		})
	})

	it('should set a ingredientsFailed flag', () => {
		expect(
			ingredientsReducer(initialState, actions.getIngredientsFailed())
		).toEqual({
			...initialState,
			ingredientsFailed: true,
			ingredientsRequest: false,
			ingredients: [],
		})
	})

	const ingredients = [
		{
			_id: '60666c42cc7b410027a1a9b5',
			name: 'Говяжий метеорит (отбивная)',
			type: 'main',
			proteins: 800,
			fat: 800,
			carbohydrates: 300,
			calories: 2674,
			price: 3000,
			image: 'https://code.s3.yandex.net/react/code/meat-04.png',
			image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
			image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
			__v: 0,
			id: '1',
		},
		{
			_id: '60666c42cc7b410027a1a9b6',
			name: 'Биокотлета из марсианской Магнолии',
			type: 'main',
			proteins: 420,
			fat: 142,
			carbohydrates: 242,
			calories: 4242,
			price: 424,
			image: 'https://code.s3.yandex.net/react/code/meat-01.png',
			image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
			image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
			__v: 0,
			id: '2',
		},
	]

	it('should set ingredients', () => {
		let response = { success: true, data: ingredients }
		expect(
			ingredientsReducer(initialState, actions.getIngredientsSuccess(response))
		).toEqual({
			...initialState,
			ingredientsFailed: false,
			ingredients: response.data,
			ingredientsRequest: false,
		})
	})
})
