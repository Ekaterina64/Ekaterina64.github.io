import { request } from './api.js'

export const getIngredientsRequest = () => {
	return request('ingredients')
}

export const getOrderRequest = (ingredientsIds) => {
	return request('orders', {
		body: JSON.stringify({ingredients: ingredientsIds}),
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	})
}