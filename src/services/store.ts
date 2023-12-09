import { AnyAction, ThunkAction, configureStore } from '@reduxjs/toolkit'
import {
	wsClose as FeedClose,
	connect as FeedConnect,
	disconnect as FeedDisconnect,
	wsError as FeedError,
	wsMessage as FeedMessage,
	wsOpen as FeedOpen,
} from './actions/feedWs'
import {
	wsClose as OrderClose,
	connect as OrderConnect,
	disconnect as OrderDisconnect,
	wsError as OrderError,
	wsMessage as OrderMessage,
	wsOpen as OrderOpen,
} from './actions/orderWs'
import { socketMiddleware } from './middleware/socket-middleware'
import { rootReducer } from './reducers'

const wsFeedActions = {
	wsConnect: FeedConnect,
	wsDisconnect: FeedDisconnect,
	onOpen: FeedOpen,
	onClose: FeedClose,
	onError: FeedError,
	onMessage: FeedMessage,
}

const wsOrderActions = {
	wsConnect: OrderConnect,
	wsDisconnect: OrderDisconnect,
	onOpen: OrderOpen,
	onClose: OrderClose,
	onError: OrderError,
	onMessage: OrderMessage,
}

const feedMiddleware = socketMiddleware(wsFeedActions)
const orderMiddleware = socketMiddleware(wsOrderActions)

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(feedMiddleware, orderMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type ThunkActionType<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AnyAction
>
