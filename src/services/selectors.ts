import { RootState } from './store'

export const getBurger = (state: RootState) => state.burgerConstructor.burger
export const getBurgerConstructor = (state: RootState) =>
	state.burgerConstructor
export const getBurgerIngredients = (state: RootState) =>
	state.burgerIngredients
export const getIngredients = (state: RootState) =>
	state.burgerIngredients.ingredients
export const getForgotPasswordSuccess = (state: RootState) =>
	state.user.forgotPasswordSuccess
export const getResetPasswordSuccess = (state: RootState) =>
	state.user.resetPasswordSuccess
export const getIsAuthenticated = (state: RootState) =>
	state.user.isAuthenticated
export const getUser = (state: RootState) => state.user.user

export const getFeeds = (state: RootState) => state.feeds.orders
export const getOrdersData = (state: RootState) => state.feeds
export const getOrders = (state: RootState) => state.userOrders.orders
export const getSelectedOrder = (store: RootState) =>
	store.burgerConstructor.selectedOrder
