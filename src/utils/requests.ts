import { ACCESS_TOKEN, REFRESH_TOKEN } from '../services/actions/user.js'
import { TIngredient } from '../types/types'
import { request, requestWithRefresh } from './api'
import { getCookie } from './cookies'

type TServerResponse<T> = {
	success: boolean
} & T

type TRefreshResponse = TServerResponse<{
	accessToken: string
	refreshToken: string
}>

type TOrderResponse = TServerResponse<{
	name: string
	order: { number: number }
}>

type TIngredientResponse = TServerResponse<{ ingredients: Array<TIngredient> }>

type TUser = {
	email: string
	name: string
}

type TLoginUser = {
	email: string
	password: string
}

type TNewPassword = {
	password: string
	token: string
}

type TUserResponse = TServerResponse<{ user: TUser }>

type TRegisterResponse = TServerResponse<{
	user: TUser
	accessToken: string
	refreshToken: string
}>

type TLoginResponse = TServerResponse<{
	accessToken: string
	refreshToken: string
	user: TUser
}>

type TMessageResponse = TServerResponse<{ message: string }>

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
export const postRegisterRequest = async (
	user: TUser & { password: string }
) => {
	return await request<TRegisterResponse>('auth/register', {
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
	return await request<TLoginResponse>('auth/login', {
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
	return await requestWithRefresh('auth/user', {
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
