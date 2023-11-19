import { constructorReducer } from './burger-constructor'
import { ingredientsReducer } from './burger-ingredients'
import { userReducer } from './user'

export const rootReducer = {
	burgerIngredients: ingredientsReducer,
	burgerConstructor: constructorReducer,
	user: userReducer,
}
