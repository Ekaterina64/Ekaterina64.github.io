import { ACCESS_TOKEN, REFRESH_TOKEN } from '../services/constants'
import {
	TAuthResponse,
	TIngredientResponse,
	TLoginUser,
	TMessageResponse,
	TNewPassword,
	TOrderResponse,
	TRefreshResponse,
	TRegisterUser,
	TUserResponse,
} from '../types/data.js'
import { request, requestWithRefresh } from './api'
import { getCookie } from './cookies'

const requestConfig = {
	headers: { 'Content-Type': 'application/json' },
}

//Main
export const getIngredientsRequest = async () => {
	return await request<TIngredientResponse>('ingredients')
}

export const getOrderRequest = async (ingredientsIds: Array<string>) => {
	return await request<TOrderResponse>('orders', {
		body: JSON.stringify({ ingredients: ingredientsIds }),
		method: 'POST',
		headers: requestConfig.headers,
	})
}

//User
export const postRegisterRequest = async (user: TRegisterUser) => {
	return await request<TAuthResponse>('auth/register', {
		body: JSON.stringify({
			email: user.email,
			password: user.password,
			name: user.name,
		}),
		method: 'POST',
		headers: requestConfig.headers,
	})
}

export const loginRequest = async (user: TLoginUser) => {
	return await request<TAuthResponse>('auth/login', {
		body: JSON.stringify({
			email: user.email,
			password: user.password,
		}),
		method: 'POST',
		headers: requestConfig.headers,
	})
}

export const logoutRequest = async () => {
	return await request<TMessageResponse>('auth/logout', {
		method: 'POST',
		headers: requestConfig.headers,
		body: JSON.stringify({ token: getCookie(REFRESH_TOKEN) }),
	})
}

export const postForgotPasswordRequest = async (email: string) => {
	return await request<TMessageResponse>('password-reset', {
		body: JSON.stringify({ email: email }),
		method: 'POST',
		headers: requestConfig.headers,
	})
}

export const postResetPasswordRequest = async (newPassword: TNewPassword) => {
	return await request<TMessageResponse>('password-reset/reset', {
		body: JSON.stringify({
			password: newPassword.password,
			token: newPassword.token,
		}),
		method: 'POST',
		headers: requestConfig.headers,
	})
}

export const getUserRequest = async () => {
	return await requestWithRefresh<TUserResponse>('auth/user', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie(ACCESS_TOKEN),
		},
	})
}

export const resetTokenRequest = async () => {
	return await request<TRefreshResponse>('auth/token', {
		method: 'POST',
		headers: requestConfig.headers,
		body: JSON.stringify({ token: getCookie(REFRESH_TOKEN) }),
	})
}

export const updateUserDataRequest = async (
	name: string,
	email: string,
	password: string
) => {
	return await requestWithRefresh<TUserResponse>('auth/user', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie(ACCESS_TOKEN),
		},
		body: JSON.stringify({
			name,
			email,
			password,
		}),
	})
}
