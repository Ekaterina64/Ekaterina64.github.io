import { checkResponse } from './check-response'

const NORMA_API = 'https://norma.nomoreparties.space/api'

export const request = async (endpoint, options) => {
	return await fetch(`${NORMA_API}/${endpoint}`, options).then(checkResponse)
}
