import { createAction } from '@reduxjs/toolkit'
import { TOrderData } from '../../types/data'
import {
	WS_ORDERS_CLOSE,
	WS_ORDERS_CONNECT,
	WS_ORDERS_DISCONNECT,
	WS_ORDERS_ERROR,
	WS_ORDERS_MESSAGE,
	WS_ORDERS_OPEN,
} from '../constants/index'

export interface IWsMessage {
	orders: Array<TOrderData>
	success: boolean
	total: number
	totalToday: number
}

export const connect = createAction<string, typeof WS_ORDERS_CONNECT>(
	WS_ORDERS_CONNECT
)
export const disconnect = createAction<number, typeof WS_ORDERS_DISCONNECT>(
	WS_ORDERS_DISCONNECT
)
export const wsOpen = createAction(WS_ORDERS_OPEN)
export const wsClose = createAction(WS_ORDERS_CLOSE)
export const wsMessage = createAction<IWsMessage, typeof WS_ORDERS_MESSAGE>(
	WS_ORDERS_MESSAGE
)
export const wsError = createAction<string, typeof WS_ORDERS_ERROR>(
	WS_ORDERS_ERROR
)

export type TWsOrdersActions =
	| ReturnType<typeof connect>
	| ReturnType<typeof disconnect>
	| ReturnType<typeof wsOpen>
	| ReturnType<typeof wsClose>
	| ReturnType<typeof wsMessage>
	| ReturnType<typeof wsError>
