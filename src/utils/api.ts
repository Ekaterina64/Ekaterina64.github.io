import { ACCESS_TOKEN, REFRESH_TOKEN } from '../services/actions/user'
import { setCookie } from './cookies'
import { resetTokenRequest } from './requests'
const NORMA_API = 'https://norma.nomoreparties.space/api'

const checkResponse = <T>(res: Response): Promise<T> => {
	return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
}

export const request = async <T>(endpoint: string, options?: RequestInit) => {
	return await fetch(`${NORMA_API}/${endpoint}`, options).then(res =>
		checkResponse<T>(res)
	)
}

export const requestWithRefresh = async <T>(
	endpoint: string,
	options?: any
) => {
	try {
		return await request<T>(endpoint, options)
	} catch (err) {
		if ((err as { message: string }).message === 'jwt expired') {
			const refreshData = await resetTokenRequest()
			setCookie(ACCESS_TOKEN, refreshData.accessToken.split('Bearer ')[1])
			setCookie(REFRESH_TOKEN, refreshData.refreshToken)
			options.headers.Authorization = refreshData.accessToken
			return await request<T>(endpoint, options)
		} else {
			return Promise.reject(err)
		}
	}
}
