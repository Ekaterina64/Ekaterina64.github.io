import { request } from './api.js'
import { getCookie } from './cookies'

const requestConfig = {
	headers: { 'Content-Type': 'application/json' },
}

//Main
export const getIngredientsRequest = () => {
	return request('ingredients')
}

export const getOrderRequest = ingredientsIds => {
	return request('orders', {
		body: JSON.stringify({ ingredients: ingredientsIds }),
		method: 'POST',
		headers: requestConfig.headers,
	})
}

//User
export const postRegisterRequest = user => {
	return request('auth/register', {
		body: JSON.stringify({
			email: user.email,
			password: user.password,
			name: user.name,
		}),
		method: 'POST',
		headers: requestConfig.headers,
	})
}

export const loginRequest = user => {
	return request('auth/login', {
		body: JSON.stringify({
			email: user.email,
			password: user.password,
		}),
		method: 'POST',
		headers: requestConfig.headers,
	})
}

export const logoutRequest = () => {
	return request('auth/logout', {
		method: 'POST',
		headers: requestConfig.headers,
		body: JSON.stringify({ token: getCookie('refreshToken') }),
	})
}

export const postForgotPasswordRequest = email => {
	return request('password-reset', {
		body: JSON.stringify({ email: email }),
		method: 'POST',
		headers: requestConfig.headers,
	})
}

export const postResetPasswordRequest = newPassword => {
	console.log(newPassword)
	return request('password-reset/reset', {
		body: JSON.stringify({
			password: newPassword.password,
			token: newPassword.token,
		}),
		method: 'POST',
		headers: requestConfig.headers,
	})
}

export const getUserRequest = () => {
	return request('auth/user', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie('accessToken'),
		},
	})
}

export const resetTokenRequest = () => {
	return request('auth/token', {
		method: 'POST',
		headers: requestConfig.headers,
		body: JSON.stringify({ token: getCookie('refreshToken') }),
	})
}
