import { TIngredient } from '../../types/data'
import { TIngredientsActions } from '../actions/burger-ingredients'
import {
	GET_INGREDIENTS_FAILED,
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
} from '../constants'

export type TIngredientsState = {
	ingredients: Array<TIngredient>
	ingredientsRequest: boolean
	ingredientsFailed: boolean
}

const initialState: TIngredientsState = {
	ingredients: [],
	ingredientsRequest: false,
	ingredientsFailed: false,
}

export const ingredientsReducer = (
	state = initialState,
	action: TIngredientsActions
) => {
	switch (action.type) {
		case GET_INGREDIENTS_REQUEST: {
			return {
				...state,
				ingredientsRequest: true,
			}
		}
		case GET_INGREDIENTS_SUCCESS: {
			return {
				...state,
				ingredientsFailed: false,
				ingredients: action.ingredients,
				ingredientsRequest: false,
			}
		}
		case GET_INGREDIENTS_FAILED: {
			return {
				...state,
				ingredientsFailed: true,
				ingredientsRequest: false,
				ingredients: [],
			}
		}
		default: {
			return state
		}
	}
}
