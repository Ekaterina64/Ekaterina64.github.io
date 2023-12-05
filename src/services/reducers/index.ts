import { constructorReducer } from './burger-constructor'
import { ingredientsReducer } from './burger-ingredients'
import { feedsReducer } from './feeds'
import { ordersReducer } from './orders'
import { userReducer } from './user'

export const rootReducer = {
	burgerIngredients: ingredientsReducer,
	burgerConstructor: constructorReducer,
	user: userReducer,
	feeds: feedsReducer,
	userOrders: ordersReducer,
}
