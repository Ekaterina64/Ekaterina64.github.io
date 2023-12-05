import {
	ActionCreatorWithPayload,
	ActionCreatorWithoutPayload,
} from '@reduxjs/toolkit'
import { Middleware, MiddlewareAPI } from 'redux'
import { AppDispatch, RootState } from '../store'

export type TwsActionTypes = {
	wsConnect: ActionCreatorWithPayload<string>
	wsDisconnect: ActionCreatorWithPayload<number>
	wsSendMessage?: ActionCreatorWithPayload<any>
	onOpen: ActionCreatorWithoutPayload
	onClose: ActionCreatorWithoutPayload
	onError: ActionCreatorWithPayload<string>
	onMessage: ActionCreatorWithPayload<any>
}

export const socketMiddleware = (wsActions: TwsActionTypes): Middleware => {
	return (store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null
		let isConnected = false
		let reconnectTimer = 0
		let url = ''

		return next => action => {
			const { dispatch } = store
			const { wsConnect, onOpen, onError, onClose, onMessage, wsDisconnect } =
				wsActions

			if (wsConnect.match(action)) {
				url = action.payload
				socket = new WebSocket(url)
			}

			if (socket) {
				socket.onopen = () => {
					dispatch(onOpen())
					isConnected = true
				}
				socket.onerror = event => {
					dispatch(onError(event.type))
				}
				socket.onmessage = event => {
					const { data } = event
					const parsedData = JSON.parse(data)
					dispatch(onMessage(parsedData))
				}
				socket.onclose = event => {
					if (event.code !== 1000) {
						dispatch(onError(event.code.toString()))
					}
					dispatch(onClose())

					if (isConnected) {
						reconnectTimer = window.setTimeout(() => {
							dispatch(wsConnect(url))
						}, 3000)
					}
				}

				if (wsDisconnect.match(action)) {
					clearTimeout(reconnectTimer)
					isConnected = false
					reconnectTimer = 0
					socket.close(action.payload)
					dispatch(onClose())
				}
			}

			next(action)
		}
	}
}
