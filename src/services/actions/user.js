import { deleteCookie, setCookie } from '../../utils/cookies'
import {
	getUserRequest,
	loginRequest,
	logoutRequest,
	postForgotPasswordRequest,
	postRegisterRequest,
	postResetPasswordRequest,
	resetTokenRequest,
	updateUserDataRequest,
} from '../../utils/requests'

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST'
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILED = 'REGISTER_FAILED'

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST'
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED'

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED'

export const USER_DATA_REQUEST = 'USER_DATA_REQUEST'
export const USER_DATA_SUCCESS = 'USER_DATA_SUCCESS'
export const USER_DATA_FAILED = 'USER_DATA_FAILED'

export const REFRESH_ACCESS_TOKEN_REQUEST = 'REFRESH_ACCESS_TOKEN_REQUEST'
export const REFRESH_ACCESS_TOKEN_SUCCESS = 'REFRESH_ACCESS_TOKEN_SUCCESS'
export const REFRESH_ACCESS_TOKEN_FAILED = 'REFRESH_ACCESS_TOKEN_FAILED'

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED'

export function login(user) {
	return function (dispatch) {
		dispatch({ type: USER_LOGIN_REQUEST })
		loginRequest(user)
			.then(res => {
				setCookie('accessToken', res.accessToken.split('Bearer ')[1])
				setCookie('refreshToken', res.refreshToken)
				dispatch({
					type: USER_LOGIN_SUCCESS,
					payload: res,
				})
			})
			.catch(() => {
				dispatch({ type: USER_LOGIN_FAILED })
			})
	}
}

export function logout() {
	return function (dispatch) {
		dispatch({ type: USER_LOGOUT_REQUEST })
		logoutRequest()
			.then(() => {
				dispatch({ type: USER_LOGOUT_SUCCESS })
				deleteCookie('accessToken')
				deleteCookie('refreshToken')
			})
			.catch(() => {
				dispatch({ type: USER_LOGOUT_FAILED })
			})
	}
}

export function getUserData() {
	return function (dispatch) {
		dispatch({ type: USER_DATA_REQUEST })
		getUserRequest()
			.then(res => {
				dispatch({
					type: USER_DATA_SUCCESS,
					payload: res,
				})
			})
			.catch(() => {
				dispatch({ type: USER_DATA_FAILED })
				dispatch(refreshToken())
			})
	}
}

export function refreshToken() {
	return function (dispatch) {
		dispatch({ type: REFRESH_ACCESS_TOKEN_REQUEST })
		resetTokenRequest()
			.then(res => {
				dispatch({
					type: REFRESH_ACCESS_TOKEN_SUCCESS,
					payload: res,
				})
				setCookie('accessToken', res.accessToken.split('Bearer ')[1])
				setCookie('refreshToken', res.refreshToken)
				dispatch(getUserData())
			})
			.catch(() => {
				dispatch({ type: REFRESH_ACCESS_TOKEN_FAILED })
			})
	}
}

export function register(user) {
	return function (dispatch) {
		dispatch({ type: REGISTER_REQUEST })
		postRegisterRequest(user)
			.then(res => {
				dispatch({
					type: REGISTER_SUCCESS,
					payload: res,
				})
			})
			.catch(() => {
				dispatch({ type: REGISTER_FAILED })
			})
	}
}

export function forgotPassword(email) {
	return function (dispatch) {
		dispatch({ type: FORGOT_PASSWORD_REQUEST })
		postForgotPasswordRequest(email)
			.then(() => {
				dispatch({ type: FORGOT_PASSWORD_SUCCESS })
			})
			.catch(() => {
				dispatch({ type: FORGOT_PASSWORD_FAILED })
			})
	}
}

export function resetPassword(newPassword) {
	return function (dispatch) {
		dispatch({ type: RESET_PASSWORD_REQUEST })
		postResetPasswordRequest(newPassword)
			.then(() => {
				dispatch({ type: RESET_PASSWORD_SUCCESS })
			})
			.catch(() => {
				dispatch({ type: RESET_PASSWORD_FAILED })
			})
	}
}

export const updateUser = (name, email, password) => {
	return function (dispatch) {
		dispatch({ type: UPDATE_USER_REQUEST })
		updateUserDataRequest(name, email, password)
			.then(res => {
				dispatch({
					type: UPDATE_USER_SUCCESS,
					payload: res,
				})
			})
			.catch(() => {
				dispatch({ type: UPDATE_USER_FAILED })
			})
	}
}
