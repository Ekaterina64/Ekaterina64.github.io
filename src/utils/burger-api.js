import { checkResponse } from './check-response'

export function getIngredients(api) {
	return fetch(`${api}/ingredients`)
	 .then(checkResponse)
}