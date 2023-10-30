import { getOrderRequest } from '../../utils/requests'

export const CLOSE_INFO = 'CLOSE_INFO'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED'

export const ADD_BUN = 'ADD_BUN'
export const ADD_FILLING = 'ADD_FILLING'
export const DELETE_FILLING = 'DELETE_FILLING'
export const MOVE_FILLING = 'MOVE_FILLING'

export function getOrder(ids) {
	return function (dispatch) {
		dispatch({
			type: GET_ORDER_REQUEST,
		})
		getOrderRequest(ids)
			.then(res => {
				dispatch({
					type: GET_ORDER_SUCCESS,
					order: res.order,
				})
			})
			.catch(() => {
				dispatch({ type: GET_ORDER_FAILED })
			})
	}
}
