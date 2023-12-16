import { TIngredient, TIngredientResponse } from '../../types/data'
import { getIngredientsRequest } from '../../utils/requests'
import {
	GET_INGREDIENTS_FAILED,
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
} from '../constants'
import { AppDispatch, RootState } from '../store'

interface IGetIngredientsRequest {
	readonly type: typeof GET_INGREDIENTS_REQUEST
}

interface IGetIngredientsFailed {
	readonly type: typeof GET_INGREDIENTS_FAILED
}

interface IGetIngredientsSuccess {
	readonly type: typeof GET_INGREDIENTS_SUCCESS
	readonly ingredients: Array<TIngredient>
}

export type TIngredientsActions =
	| IGetIngredientsRequest
	| IGetIngredientsFailed
	| IGetIngredientsSuccess

export const getIngredientsReq = (): IGetIngredientsRequest => ({
	type: GET_INGREDIENTS_REQUEST,
})

export const getIngredientsFailed = (): IGetIngredientsFailed => ({
	type: GET_INGREDIENTS_FAILED,
})

export const getIngredientsSuccess = (
	res: TIngredientResponse
): IGetIngredientsSuccess => ({
	type: GET_INGREDIENTS_SUCCESS,
	ingredients: res.data,
})

export const getIngredientById = (id: string) => (state: RootState) => {
	return state.burgerIngredients.ingredients.find(
		(ingredient: TIngredient) => ingredient._id === id
	)
}

export function getIngredients() {
	return function (dispatch: AppDispatch) {
		dispatch(getIngredientsReq())
		getIngredientsRequest()
			.then(res => dispatch(getIngredientsSuccess(res)))
			.catch(() => dispatch(getIngredientsFailed()))
	}
}
