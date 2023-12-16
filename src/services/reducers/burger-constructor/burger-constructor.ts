import update from 'immutability-helper'
import { TBurger, TOrder, TOrderData } from '../../../types/data'
import { TConstructorActions } from '../../actions/burger-constructor'
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
} from '../../constants'

export type TConstructorState = {
	burger: TBurger
	order: TOrder
	selectedOrder?: TOrderData
	orderRequest: boolean
	orderFailed: boolean
}

export const initialState: TConstructorState = {
	burger: {
		buns: [],
		fillings: [],
	},

	order: null,
	selectedOrder: undefined,
	orderRequest: false,
	orderFailed: false,
}

export const constructorReducer = (
	state = initialState,
	action: TConstructorActions
): TConstructorState => {
	switch (action.type) {
		case GET_ORDER_REQUEST: {
			return {
				...state,
				orderRequest: true,
			}
		}
		case GET_ORDER_SUCCESS: {
			return {
				...state,
				orderFailed: false,
				order: action.payload,
				orderRequest: false,
			}
		}
		case GET_ORDER_FAILED: {
			return {
				...state,
				orderFailed: true,
				orderRequest: false,
				order: null,
			}
		}
		case GET_USER_ORDER_REQUEST: {
			return {
				...state,
				orderRequest: true,
			}
		}
		case GET_USER_ORDER_SUCCESS: {
			return {
				...state,
				orderFailed: false,
				selectedOrder: action.payload,
				orderRequest: false,
			}
		}
		case GET_USER_ORDER_FAILED: {
			return {
				...state,
				orderFailed: true,
				orderRequest: false,
				selectedOrder: undefined,
			}
		}
		case CLOSE_INFO: {
			return {
				...state,
				order: null,
				selectedOrder: undefined,
				burger: { buns: [], fillings: [] },
			}
		}
		case ADD_BUN: {
			return {
				...state,
				burger: {
					...state.burger,
					buns: [action.bun, action.bun],
				},
			}
		}
		case ADD_FILLING: {
			return {
				...state,
				burger: {
					...state.burger,
					fillings: [...state.burger.fillings, action.filling],
				},
			}
		}
		case DELETE_FILLING: {
			return {
				...state,
				burger: {
					...state.burger,
					fillings: [...state.burger.fillings].filter(
						item => item.id !== action.id
					),
				},
			}
		}
		case MOVE_FILLING: {
			return {
				...state,
				burger: {
					...state.burger,
					fillings: update(state.burger.fillings, {
						$splice: [
							[action.dragIndex, 1],
							[action.hoverIndex, 0, state.burger.fillings[action.dragIndex]],
						],
					}),
				},
			}
		}
		default: {
			return state
		}
	}
}
