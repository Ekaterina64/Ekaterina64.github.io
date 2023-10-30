import { ACCESS_TOKEN, REFRESH_TOKEN } from '../services/actions/user'
import { checkResponse } from './check-response'
import { setCookie } from './cookies'
import { resetTokenRequest } from './requests'
const NORMA_API = 'https://norma.nomoreparties.space/api'

export const request = async (endpoint, options) => {
	return await fetch(`${NORMA_API}/${endpoint}`, options).then(checkResponse)
}

export const requestWithRefresh = async (endpoint, options) => {
	try {
		return await request(endpoint, options)
	} catch (err) {
		if (err.message === 'jwt expired') {
			const refreshData = await resetTokenRequest()
			setCookie(ACCESS_TOKEN, refreshData.accessToken.split('Bearer ')[1])
			setCookie(REFRESH_TOKEN, refreshData.refreshToken)
			options.headers.Authorization = refreshData.accessToken
			return await request(endpoint, options)
		} else {
			return Promise.reject(err)
		}
	}
}
