export const getBurger = (state: any) => state.burgerConstructor.burger
export const getBurgerConstructor = (state: any) => state.burgerConstructor
export const getBurgerIngredients = (state: any) => state.burgerIngredients
export const getIngredients = (state: any) =>
	state.burgerIngredients.ingredients
export const getForgotPasswordSuccess = (state: any) =>
	state.user.forgotPasswordSuccess
export const getResetPasswordSuccess = (state: any) =>
	state.user.resetPasswordSuccess
export const getIsAuthenticated = (state: any) => state.user.isAuthenticated
export const getUser = (state: any) => state.user.user
