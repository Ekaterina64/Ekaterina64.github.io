import { createAction } from '@reduxjs/toolkit'
import { TOrderData } from '../../types/data'
import {
	WS_FEEDS_CLOSE,
	WS_FEEDS_CONNECT,
	WS_FEEDS_DISCONNECT,
	WS_FEEDS_ERROR,
	WS_FEEDS_MESSAGE,
	WS_FEEDS_OPEN,
} from '../constants/index'

export interface IWsMessage {
	orders: Array<TOrderData>
	success: boolean
	total: number
	totalToday: number
}

export const connect = createAction<string, typeof WS_FEEDS_CONNECT>(
	WS_FEEDS_CONNECT
)
export const disconnect = createAction<number, typeof WS_FEEDS_DISCONNECT>(
	WS_FEEDS_DISCONNECT
)
export const wsOpen = createAction(WS_FEEDS_OPEN)
export const wsClose = createAction(WS_FEEDS_CLOSE)
export const wsMessage = createAction<IWsMessage, typeof WS_FEEDS_MESSAGE>(
	WS_FEEDS_MESSAGE
)
export const wsError = createAction<string, typeof WS_FEEDS_ERROR>(
	WS_FEEDS_ERROR
)

export type TWsFeedsActions =
	| ReturnType<typeof connect>
	| ReturnType<typeof disconnect>
	| ReturnType<typeof wsOpen>
	| ReturnType<typeof wsClose>
	| ReturnType<typeof wsMessage>
	| ReturnType<typeof wsError>
