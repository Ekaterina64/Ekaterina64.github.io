import { useMemo } from 'react'
import { useMatch } from 'react-router-dom'
import { PROFILE_ORDERS } from '../pages'
import { getBurgerIngredients } from '../services/selectors'
import { TIngredient, TOrderData } from '../types/data'
import { useAppSelector } from '../types/hooks'
import { Types } from '../utils/ingredient-types'

export const useOrder = (order?: TOrderData) => {
	const { ingredients: allIngredients } = useAppSelector(getBurgerIngredients)

	const getOrderList = () => {
		const elements: Array<TIngredient> = []
		order?.ingredients.forEach(ingredientId => {
			allIngredients.forEach((ingredient: TIngredient) => {
				if (ingredient._id === ingredientId) {
					elements.push(ingredient)
				}
			})
		})

		return elements
	}
	const orderIngredients = getOrderList()
	const getBunSize = () => {
		return orderIngredients.filter(ingredient => {
			return ingredient.type === Types.BUN
		}).length
	}
	const totalPrice = useMemo(
		() =>
			orderIngredients.reduce(
				(value, ingredient) =>
					value + ingredient.price * (getBunSize() === 1 ? 2 : 1),
				0
			),
		[orderIngredients]
	)

	const getOrderStatus = () => {
		if (order?.status === 'done') {
			return 'Выполнен'
		} else if (order?.status === 'created') {
			return 'Создан'
		} else {
			return 'Готовится'
		}
	}
	const statusRus = getOrderStatus()

	const matchProfile = Boolean(useMatch(PROFILE_ORDERS))

	return {
		orderIngredients,
		totalPrice,
		statusRus,
		matchProfile,
	}
}
