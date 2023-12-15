import {
	TBurgerIngredient,
	TIngredient,
	TOrder,
	TOrderData,
	TOrderResponse,
	TUserOrderResponse,
} from '../../types/data'
import { getOrderRequest, getUserOrderRequest } from '../../utils/requests'
import {
	ADD_BUN,
	ADD_FILLING,
	CLOSE_INFO,
	DELETE_FILLING,
	GET_ORDER_FAILED,
	GET_ORDER_REQUEST,
	GET_ORDER_SUCCESS,
	GET_USER_ORDER_FAILED,
	GET_USER_ORDER_REQUEST,
	GET_USER_ORDER_SUCCESS,
	MOVE_FILLING,
} from '../constants'
import { AppDispatch } from '../store'

interface IGetOrderRequest {
	readonly type: typeof GET_ORDER_REQUEST
}

interface IGetOrderFailed {
	readonly type: typeof GET_ORDER_FAILED
}

interface IGetOrderSuccess {
	readonly type: typeof GET_ORDER_SUCCESS
	readonly payload: TOrder
}

interface IGetUserOrderRequest {
	readonly type: typeof GET_USER_ORDER_REQUEST
}

interface IGetUserOrderFailed {
	readonly type: typeof GET_USER_ORDER_FAILED
}

interface IGetUserOrderSuccess {
	readonly type: typeof GET_USER_ORDER_SUCCESS
	readonly payload: TOrderData
}

interface ICloseInfo {
	readonly type: typeof CLOSE_INFO
}

interface IAddBun {
	readonly type: typeof ADD_BUN
	readonly bun: TIngredient
}

interface IAddFilling {
	readonly type: typeof ADD_FILLING
	readonly filling: TBurgerIngredient
}

interface IDeleteFilling {
	readonly type: typeof DELETE_FILLING
	readonly id: string
}

interface IMoveFilling {
	readonly type: typeof MOVE_FILLING
	readonly dragIndex: number
	readonly hoverIndex: number
}

export type TConstructorActions =
	| IGetOrderRequest
	| IGetOrderFailed
	| IGetOrderSuccess
	| IGetUserOrderSuccess
	| IGetUserOrderRequest
	| IGetUserOrderFailed
	| ICloseInfo
	| IAddBun
	| IAddFilling
	| IDeleteFilling
	| IMoveFilling

export const getOrderReq = (): IGetOrderRequest => ({ type: GET_ORDER_REQUEST })

export const getOrderFailed = (): IGetOrderFailed => ({
	type: GET_ORDER_FAILED,
})

export const getOrderSuccess = (res: TOrderResponse): IGetOrderSuccess => ({
	type: GET_ORDER_SUCCESS,
	payload: { name: res.name, order: res.order },
})

export const getUserOrderReq = (): IGetUserOrderRequest => ({
	type: GET_USER_ORDER_REQUEST,
})

export const getUserOrderFailed = (): IGetUserOrderFailed => ({
	type: GET_USER_ORDER_FAILED,
})

export const getUserOrderSuccess = (
	res: TUserOrderResponse
): IGetUserOrderSuccess => ({
	type: GET_USER_ORDER_SUCCESS,
	payload: res.orders[0],
})

export const closeInfo = (): ICloseInfo => ({
	type: CLOSE_INFO,
})

export const addBun = (bun: TIngredient): IAddBun => ({
	type: ADD_BUN,
	bun: bun,
})

export const addFilling = (filling: TBurgerIngredient): IAddFilling => ({
	type: ADD_FILLING,
	filling: filling,
})

export const deleteFilling = (id: string): IDeleteFilling => ({
	type: DELETE_FILLING,
	id: id,
})

export const moveFilling = (
	dragIndex: number,
	hoverIndex: number
): IMoveFilling => ({
	type: MOVE_FILLING,
	dragIndex: dragIndex,
	hoverIndex: hoverIndex,
})

export function getOrder(ids: Array<string>) {
	return function (dispatch: AppDispatch) {
		dispatch(getOrderReq())
		console.log('disp, next req')
		getOrderRequest(ids)
			.then(res => dispatch(getOrderSuccess(res)))
			.catch(() => dispatch(getOrderFailed()))
	}
}

export function getUserOrderByNumber(number?: string) {
	return function (dispatch: AppDispatch) {
		dispatch(getUserOrderReq())
		getUserOrderRequest(number)
			.then(res => dispatch(getUserOrderSuccess(res)))
			.catch(() => dispatch(getUserOrderFailed()))
	}
}
