import { constructorReducer } from './burger-constructor'
import { ingredientsReducer } from './burger-ingredients'

export const rootReducer = {
	burgerIngredients: ingredientsReducer,
	burgerConstructor: constructorReducer,
}
