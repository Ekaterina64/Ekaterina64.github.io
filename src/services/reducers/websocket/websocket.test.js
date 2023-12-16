import { expect } from '@jest/globals'
import * as feedsActions from '../../actions/feedWs'
import * as ordersActions from '../../actions/orderWs'

import { initialState as feedsInitialState, feedsReducer } from './feeds'
import { initialState as ordersInitialState, ordersReducer } from './orders'

describe('Web socket reducers - Feeds and Orders', () => {
	it('should return initial state', () => {
		expect(feedsReducer(undefined, {})).toEqual(feedsInitialState)
		expect(ordersReducer(undefined, {})).toEqual(ordersInitialState)
	})

	it('should set connecting status', () => {
		expect(
			feedsReducer(feedsInitialState, feedsActions.connect('url'))
		).toEqual({
			...feedsInitialState,
			status: 'CONNECTING',
		})
		expect(
			ordersReducer(ordersInitialState, ordersActions.connect('url'))
		).toEqual({
			...ordersInitialState,
			status: 'CONNECTING',
		})
	})

	it('should open ws', () => {
		expect(feedsReducer(feedsInitialState, feedsActions.wsOpen())).toEqual({
			...feedsInitialState,
			status: 'ONLINE',
			error: false,
			errMessage: null,
			wsConnected: true,
		})
		expect(ordersReducer(ordersInitialState, ordersActions.wsOpen())).toEqual({
			...ordersInitialState,
			status: 'ONLINE',
			error: false,
			errMessage: null,
			wsConnected: true,
		})
	})

	it('should handle the error', () => {
		expect(
			feedsReducer(feedsInitialState, feedsActions.wsError('error'))
		).toEqual({
			...feedsInitialState,
			error: true,
			errMessage: 'error',
		})
		expect(
			ordersReducer(ordersInitialState, ordersActions.wsError('error'))
		).toEqual({
			...ordersInitialState,
			error: true,
			errMessage: 'error',
		})
	})

	it('should disconnect', () => {
		expect(
			feedsReducer(feedsInitialState, feedsActions.disconnect(1000))
		).toEqual({
			...feedsInitialState,
			status: 'OFFLINE',
			error: false,
			errMessage: null,
			wsConnected: false,
		})
		expect(
			ordersReducer(ordersInitialState, ordersActions.disconnect(1000))
		).toEqual({
			...ordersInitialState,
			status: 'OFFLINE',
			error: false,
			errMessage: null,
			wsConnected: false,
		})
	})

	it('should handle the message', () => {
		let message = { total: 1, totalToday: 1, orders: ['1', '2', '3'] }
		expect(
			feedsReducer(feedsInitialState, feedsActions.wsMessage(message))
		).toEqual({
			...feedsInitialState,
			orders: message.orders,
			total: message.total,
			totalToday: message.totalToday,
		})
		expect(
			ordersReducer(ordersInitialState, ordersActions.wsMessage(message))
		).toEqual({
			...ordersInitialState,
			orders: message.orders,
			total: message.total,
			totalToday: message.totalToday,
		})
	})
})
