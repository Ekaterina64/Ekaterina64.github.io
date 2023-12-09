import { expect } from '@jest/globals'
import * as actions from '../../actions/burger-constructor'

import { constructorReducer, initialState } from './burger-constructor'

describe('Constructor reducer', () => {
	it('should return initial state', () => {
		expect(constructorReducer(undefined, {})).toEqual(initialState)
	})

	it('should set a orderRequest flag', () => {
		expect(constructorReducer(initialState, actions.getOrderReq())).toEqual({
			...initialState,
			orderRequest: true,
		})
		expect(constructorReducer(initialState, actions.getUserOrderReq())).toEqual(
			{
				...initialState,
				orderRequest: true,
			}
		)
	})

	it('should set a orderFailed flag', () => {
		expect(constructorReducer(initialState, actions.getOrderFailed())).toEqual({
			...initialState,
			orderRequest: false,
			orderFailed: true,
			order: null,
		})
		expect(
			constructorReducer(initialState, actions.getUserOrderFailed())
		).toEqual({
			...initialState,
			orderRequest: false,
			orderFailed: true,
			selectedOrder: undefined,
		})
	})

	it('should set a order', () => {
		let response = { success: true, name: 'Test', order: { number: 123 } }
		let userResponse = {
			success: true,
			orders: [
				{
					_id: '123',
					ingredients: ['i1, i2, i3'],
					status: 'done',
					name: 'Test',
					createdAt: 'today',
					updatedAt: 'today',
					number: 123,
				},
			],
		}
		expect(
			constructorReducer(initialState, actions.getOrderSuccess(response))
		).toEqual({
			...initialState,
			orderRequest: false,
			orderFailed: false,
			order: { name: response.name, order: response.order },
		})
		expect(
			constructorReducer(
				initialState,
				actions.getUserOrderSuccess(userResponse)
			)
		).toEqual({
			...initialState,
			orderRequest: false,
			orderFailed: false,
			selectedOrder: userResponse.orders[0],
		})
	})

	it('should clear constructor', () => {
		expect(constructorReducer(initialState, actions.closeInfo())).toEqual({
			...initialState,
			order: null,
			selectedOrder: undefined,
			burger: { buns: [], fillings: [] },
		})
	})

	it('should add buns', () => {
		let bun = {
			_id: '60666c42cc7b410027a1a9b1',
			name: 'Краторная булка N-200i',
			type: 'bun',
			proteins: 80,
			fat: 24,
			carbohydrates: 53,
			calories: 420,
			price: 1255,
			image: 'https://code.s3.yandex.net/react/code/bun-02.png',
			image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
			image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
			__v: 0,
		}
		expect(constructorReducer(initialState, actions.addBun(bun))).toEqual({
			...initialState,
			burger: { ...initialState.burger, buns: [bun, bun] },
		})
	})

	const fillings = [
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

	it('should add filling', () => {
		expect(
			constructorReducer(initialState, actions.addFilling(fillings[0]))
		).toEqual({
			...initialState,
			burger: {
				...initialState.burger,
				fillings: [...initialState.burger.fillings, fillings[0]],
			},
		})
	})

	const state = {
		burger: {
			buns: [],
			fillings: fillings,
		},

		order: null,
		selectedOrder: undefined,
		orderRequest: false,
		orderFailed: false,
	}

	it('should delete filling', () => {
		expect(constructorReducer(state, actions.deleteFilling('1'))).toEqual({
			...state,
			burger: {
				...state.burger,
				fillings: [fillings[1]],
			},
		})
	})

	it('should move fillings', () => {
		expect(constructorReducer(state, actions.moveFilling(0, 1))).toEqual({
			...state,
			burger: {
				...state.burger,
				fillings: [fillings[1], fillings[0]],
			},
		})
	})
})
