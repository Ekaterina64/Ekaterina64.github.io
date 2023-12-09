import {
	TAuthResponse,
	TLoginUser,
	TNewPassword,
	TRegisterUser,
	TUserResponse,
} from '../../types/data'
import { deleteCookie, setCookie } from '../../utils/cookies'
import {
	getUserRequest,
	loginRequest,
	logoutRequest,
	postForgotPasswordRequest,
	postRegisterRequest,
	postResetPasswordRequest,
	updateUserDataRequest,
} from '../../utils/requests'
import { AppDispatch } from '../store'

import {
	ACCESS_TOKEN,
	FORGOT_PASSWORD_FAILED,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	REFRESH_TOKEN,
	REGISTER_FAILED,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	RESET_PASSWORD_FAILED,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	UPDATE_USER_FAILED,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	USER_DATA_FAILED,
	USER_DATA_REQUEST,
	USER_DATA_SUCCESS,
	USER_LOGIN_FAILED,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT_FAILED,
	USER_LOGOUT_REQUEST,
	USER_LOGOUT_SUCCESS,
} from '../constants'

interface IUserLoginRequest {
	readonly type: typeof USER_LOGIN_REQUEST
}

interface IUserLoginFailed {
	readonly type: typeof USER_LOGIN_FAILED
}

interface IUserLoginSuccess {
	readonly type: typeof USER_LOGIN_SUCCESS
	readonly payload: TAuthResponse
}

interface IUserLogoutRequest {
	readonly type: typeof USER_LOGOUT_REQUEST
}

interface IUserLogoutFailed {
	readonly type: typeof USER_LOGOUT_FAILED
}

interface IUserLogoutSuccess {
	readonly type: typeof USER_LOGOUT_SUCCESS
}

interface IUserDataRequest {
	readonly type: typeof USER_DATA_REQUEST
}

interface IUserDataFailed {
	readonly type: typeof USER_DATA_FAILED
}

interface IUserDataSuccess {
	readonly type: typeof USER_DATA_SUCCESS
	payload: TUserResponse
}

interface IRegisterRequest {
	readonly type: typeof REGISTER_REQUEST
}

interface IRegisterFailed {
	readonly type: typeof REGISTER_FAILED
}

interface IRegisterSuccess {
	readonly type: typeof REGISTER_SUCCESS
	payload: TAuthResponse
}

interface IForgotPasswordRequest {
	readonly type: typeof FORGOT_PASSWORD_REQUEST
}

interface IForgotPasswordFailed {
	readonly type: typeof FORGOT_PASSWORD_FAILED
}

interface IForgotPasswordSuccess {
	readonly type: typeof FORGOT_PASSWORD_SUCCESS
}

interface IResetPasswordRequest {
	readonly type: typeof RESET_PASSWORD_REQUEST
}

interface IResetPasswordFailed {
	readonly type: typeof RESET_PASSWORD_FAILED
}

interface IResetPasswordSuccess {
	readonly type: typeof RESET_PASSWORD_SUCCESS
}

interface IUpdateUserRequest {
	readonly type: typeof UPDATE_USER_REQUEST
}

interface IUpdateUserFailed {
	readonly type: typeof UPDATE_USER_FAILED
}

interface IUpdateUserSuccess {
	readonly type: typeof UPDATE_USER_SUCCESS
	readonly payload: TUserResponse
}

export type TUserActions =
	| IUserLoginRequest
	| IUserLoginFailed
	| IUserLoginSuccess
	| IUserLogoutRequest
	| IUserLogoutFailed
	| IUserLogoutSuccess
	| IUserDataRequest
	| IUserDataFailed
	| IUserDataSuccess
	| IRegisterRequest
	| IRegisterFailed
	| IRegisterSuccess
	| IForgotPasswordRequest
	| IForgotPasswordFailed
	| IForgotPasswordSuccess
	| IResetPasswordRequest
	| IResetPasswordFailed
	| IResetPasswordSuccess
	| IUpdateUserRequest
	| IUpdateUserFailed
	| IUpdateUserSuccess

export const userLoginReq = (): IUserLoginRequest => ({
	type: USER_LOGIN_REQUEST,
})

export const userLoginFailed = (): IUserLoginFailed => ({
	type: USER_LOGIN_FAILED,
})

export const userLoginSuccess = (res: TAuthResponse): IUserLoginSuccess => ({
	type: USER_LOGIN_SUCCESS,
	payload: res,
})

export const userLogoutReq = (): IUserLogoutRequest => ({
	type: USER_LOGOUT_REQUEST,
})

export const userLogoutFailed = (): IUserLogoutFailed => ({
	type: USER_LOGOUT_FAILED,
})

export const userLogoutSuccess = (): IUserLogoutSuccess => ({
	type: USER_LOGOUT_SUCCESS,
})

export const userDataReq = (): IUserDataRequest => ({
	type: USER_DATA_REQUEST,
})

export const userDataFailed = (): IUserDataFailed => ({
	type: USER_DATA_FAILED,
})

export const userDataSuccess = (res: TUserResponse): IUserDataSuccess => ({
	type: USER_DATA_SUCCESS,
	payload: res,
})

export const registerReq = (): IRegisterRequest => ({
	type: REGISTER_REQUEST,
})

export const registerFailed = (): IRegisterFailed => ({
	type: REGISTER_FAILED,
})

export const registerSuccess = (res: TAuthResponse): IRegisterSuccess => ({
	type: REGISTER_SUCCESS,
	payload: res,
})

export const forgotPasswordReq = (): IForgotPasswordRequest => ({
	type: FORGOT_PASSWORD_REQUEST,
})

export const forgotPasswordFailed = (): IForgotPasswordFailed => ({
	type: FORGOT_PASSWORD_FAILED,
})

export const forgotPasswordSuccess = (): IForgotPasswordSuccess => ({
	type: FORGOT_PASSWORD_SUCCESS,
})

export const resetPasswordReq = (): IResetPasswordRequest => ({
	type: RESET_PASSWORD_REQUEST,
})

export const resetPasswordFailed = (): IResetPasswordFailed => ({
	type: RESET_PASSWORD_FAILED,
})

export const resetPasswordSuccess = (): IResetPasswordSuccess => ({
	type: RESET_PASSWORD_SUCCESS,
})

export const updateUserReq = (): IUpdateUserRequest => ({
	type: UPDATE_USER_REQUEST,
})

export const updateUserFailed = (): IUpdateUserFailed => ({
	type: UPDATE_USER_FAILED,
})

export const updateUserSuccess = (res: TUserResponse): IUpdateUserSuccess => ({
	type: UPDATE_USER_SUCCESS,
	payload: res,
})

export function login(user: TLoginUser) {
	return function (dispatch: AppDispatch) {
		dispatch(userLoginReq())
		loginRequest(user)
			.then(res => {
				setCookie(ACCESS_TOKEN, res.accessToken.split('Bearer ')[1])
				setCookie(REFRESH_TOKEN, res.refreshToken)
				dispatch(userLoginSuccess(res))
			})
			.catch(() => {
				dispatch(userLoginFailed())
			})
	}
}

export function logout() {
	return function (dispatch: AppDispatch) {
		dispatch(userLogoutReq())
		logoutRequest()
			.then(() => {
				dispatch(userLogoutSuccess())
				deleteCookie(ACCESS_TOKEN)
				deleteCookie(REFRESH_TOKEN)
			})
			.catch(() => dispatch(userLogoutFailed()))
	}
}

export function getUserData() {
	return function (dispatch: AppDispatch) {
		dispatch(userDataReq())
		getUserRequest()
			.then(res => dispatch(userDataSuccess(res)))
			.catch(() => dispatch(userDataFailed()))
	}
}

export function register(user: TRegisterUser) {
	return function (dispatch: AppDispatch) {
		dispatch(registerReq())
		postRegisterRequest(user)
			.then(res => dispatch(registerSuccess(res)))
			.catch(() => dispatch(registerFailed()))
	}
}

export function forgotPassword(email: string) {
	return function (dispatch: AppDispatch) {
		dispatch(forgotPasswordReq())
		postForgotPasswordRequest(email)
			.then(() => dispatch(forgotPasswordSuccess()))
			.catch(() => dispatch(forgotPasswordFailed()))
	}
}

export function resetPassword(newPassword: TNewPassword) {
	return function (dispatch: AppDispatch) {
		dispatch(resetPasswordReq())
		postResetPasswordRequest(newPassword)
			.then(() => dispatch(resetPasswordSuccess()))
			.catch(() => dispatch(resetPasswordFailed()))
	}
}

export const updateUser = (name: string, email: string, password: string) => {
	return function (dispatch: AppDispatch) {
		dispatch(updateUserReq())
		updateUserDataRequest(name, email, password)
			.then(res => dispatch(updateUserSuccess(res)))
			.catch(() => dispatch(updateUserFailed()))
	}
}
