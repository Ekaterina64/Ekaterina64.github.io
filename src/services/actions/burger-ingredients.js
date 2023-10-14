import { getIngredientsRequest } from '../../utils/requests'

export const GET_INGREDIENTS_REQUEST = 'GET_ITEMS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_ITEMS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_ITEMS_FAILED'

export const SHOW_INFO = 'SHOW_INFO'
export const CLOSE_INFO = 'CLOSE_INFO'

export function getIngredients() {
	return function (dispatch) {
		dispatch({
			type: GET_INGREDIENTS_REQUEST,
		})
		getIngredientsRequest()
			.then(res => {
				dispatch({
					type: GET_INGREDIENTS_SUCCESS,
					ingredients: res.data,
				})
			})
			.catch(() => {
				dispatch({ type: GET_INGREDIENTS_FAILED })
			})
	}
}
