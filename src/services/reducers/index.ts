import { constructorReducer } from './burger-constructor/burger-constructor'
import { ingredientsReducer } from './burger-ingredients/burger-ingredients'
import { userReducer } from './user/user'
import { feedsReducer } from './websocket/feeds'
import { ordersReducer } from './websocket/orders'

export const rootReducer = {
	burgerIngredients: ingredientsReducer,
	burgerConstructor: constructorReducer,
	user: userReducer,
	feeds: feedsReducer,
	userOrders: ordersReducer,
}
