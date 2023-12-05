import ForgotPasswordPage from './forgot-password'
import IngredientPage from './ingredient/ingredient'
import LoginPage from './login'
import MainPage from './main/main'
import NotFound404Page from './not-found/not-found'
import ProfilePage from './profile/profile'
import RegisterPage from './register'
import ResetPasswordPage from './reset-password'

export const LOGIN = '/login'
export const REGISTER = '/register'
export const FORGOT_PASSWORD = '/forgot-password'
export const RESET_PASSWORD = '/reset-password'
export const PROFILE = '/profile'
export const PROFILE_ORDERS = `${PROFILE}/orders`
export const MAIN = '/'
export const INGREDIENT = '/ingredients/:id'
export const FEED = '/feed'
export const FEED_INFO = '/feed/:number'
export const ORDERS_INFO = `${PROFILE_ORDERS}/:number`

export {
	ForgotPasswordPage,
	IngredientPage,
	LoginPage,
	MainPage,
	NotFound404Page,
	ProfilePage,
	RegisterPage,
	ResetPasswordPage,
}
