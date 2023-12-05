import { createReducer } from '@reduxjs/toolkit'
import {
	IWsMessage,
	connect,
	disconnect,
	wsError,
	wsMessage,
	wsOpen,
} from '../actions/feedWs'

export type TFeedsState = Omit<IWsMessage, 'success'> & {
	wsConnected: boolean
	error: boolean
	errMessage: string | null
	status: 'CONNECTING' | 'ONLINE' | 'OFFLINE'
}

const initialState: TFeedsState = {
	wsConnected: false,
	orders: [],
	total: 0,
	totalToday: 0,
	error: false,
	errMessage: null,
	status: 'OFFLINE',
}

export const feedsReducer = createReducer(initialState, builder => {
	builder
		.addCase(connect, state => {
			state.status = 'CONNECTING'
		})
		.addCase(wsOpen, state => {
			state.status = 'ONLINE'
			state.error = false
			state.errMessage = null
			state.wsConnected = true
		})
		.addCase(wsError, (state, action) => {
			state.error = true
			state.errMessage = action.payload
		})
		.addCase(wsMessage, (state, action) => {
			const { orders, total, totalToday } = action.payload
			state.orders = orders
			state.total = total
			state.totalToday = totalToday
		})
		.addCase(disconnect, state => {
			state.wsConnected = false
			state.error = false
			state.errMessage = null
			state.status = 'OFFLINE'
		})
})
