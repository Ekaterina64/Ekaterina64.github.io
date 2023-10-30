export const getBurger = state => state.burgerConstructor.burger
export const getBurgerConstructor = state => state.burgerConstructor
export const getBurgerIngredients = state => state.burgerIngredients
export const getIngredients = state => state.burgerIngredients.ingredients
export const getForgotPasswordSuccess = state =>
	state.user.forgotPasswordSuccess
export const getResetPasswordSuccess = state => state.user.resetPasswordSuccess
export const getIsAuthenticated = state => state.user.isAuthenticated
export const getUser = state => state.user.user
