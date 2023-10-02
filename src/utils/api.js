import { checkResponse } from './check-response'

const NORMA_API = "https://norma.nomoreparties.space/api";

export function getIngredients() {
	return fetch(`${NORMA_API}/ingredients`)
	 .then(checkResponse)
}

export const postOrder = (ingredients) =>
  fetch(`${NORMA_API}/orders`, {
    body: JSON.stringify(ingredients),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);