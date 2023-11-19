import { RootState } from '../../services/store'

export const totalPriceSelector = (state: RootState): number => {
	const {
		burgerConstructor: { burger },
	} = state
	const allIngredients = [...burger.buns, ...burger.fillings]
	return allIngredients.reduce((acc, item) => acc + item.price, 0)
}
