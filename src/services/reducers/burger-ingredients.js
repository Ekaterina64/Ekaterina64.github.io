import {
	CLOSE_INFO,
	GET_INGREDIENTS_FAILED,
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	SHOW_INFO,
} from '../actions/burger-ingredients.js'

const initialState = {
	ingredients: [],
	ingredientsRequest: false,
	ingredientsFailed: false,

	infoAboutIngredient: null,
}

export const ingredientsReducer = (state = initialState, action) => {
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
		case SHOW_INFO: {
			return {
				...state,
				infoAboutIngredient: action.item,
			}
		}
		case CLOSE_INFO: {
			return {
				...state,
				infoAboutIngredient: null,
			}
		}
		default: {
			return state
		}
	}
}
