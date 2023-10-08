import { combineReducers } from 'redux'
import { constructorReducer } from './burger-constructor'
import { ingredientsReducer } from './burger-ingredients'

export const rootReducer = combineReducers({
	burgerIngredients: ingredientsReducer,
	burgerConstructor: constructorReducer
});