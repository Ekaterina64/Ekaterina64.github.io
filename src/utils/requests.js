import { ACCESS_TOKEN, REFRESH_TOKEN } from '../services/actions/user.js'
import { request, requestWithRefresh } from './api.js'
import { getCookie } from './cookies'

const requestConfig = {
	headers: { 'Content-Type': 'application/json' },
}

//Main
export const getIngredientsRequest = async () => {
	return await request('ingredients')
}

export const getOrderRequest = async ingredientsIds => {
	return await request('orders', {
		body: JSON.stringify({ ingredients: ingredientsIds }),
		method: 'POST',
		headers: requestConfig.headers,
	})
}

//User
export const postRegisterRequest = async user => {
	return await request('auth/register', {
		body: JSON.stringify({
			email: user.email,
			password: user.password,
			name: user.name,
		}),
		method: 'POST',
		headers: requestConfig.headers,
	})
}

export const loginRequest = async user => {
	return await request('auth/login', {
		body: JSON.stringify({
			email: user.email,
			password: user.password,
		}),
		method: 'POST',
		headers: requestConfig.headers,
	})
}

export const logoutRequest = async () => {
	return await request('auth/logout', {
		method: 'POST',
		headers: requestConfig.headers,
		body: JSON.stringify({ token: getCookie(REFRESH_TOKEN) }),
	})
}

export const postForgotPasswordRequest = async email => {
	return await request('password-reset', {
		body: JSON.stringify({ email: email }),
		method: 'POST',
		headers: requestConfig.headers,
	})
}

export const postResetPasswordRequest = async newPassword => {
	return await request('password-reset/reset', {
		body: JSON.stringify({
			password: newPassword.password,
			token: newPassword.token,
		}),
		method: 'POST',
		headers: requestConfig.headers,
	})
}

export const getUserRequest = async () => {
	return await requestWithRefresh('auth/user', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie(ACCESS_TOKEN),
		},
	})
}

export const resetTokenRequest = async () => {
	return await request('auth/token', {
		method: 'POST',
		headers: requestConfig.headers,
		body: JSON.stringify({ token: getCookie(REFRESH_TOKEN) }),
	})
}

export const updateUserDataRequest = async (name, email, password) => {
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
