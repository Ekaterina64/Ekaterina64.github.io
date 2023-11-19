import { useMemo } from 'react'
import { TIngredient } from '../types/data'
import { Types } from '../utils/ingredient-types'

export const useFilter = (data: TIngredient[]) => {
	const getFilteredData = (curFilter: string) => {
		return data.filter(ingredient => {
			return ingredient.type === curFilter
		})
	}

	const dataBun = useMemo(() => getFilteredData(Types.BUN), [data])
	const dataMain = useMemo(() => getFilteredData(Types.MAIN), [data])
	const dataSouse = useMemo(() => getFilteredData(Types.SOUSE), [data])

	return [dataBun, dataMain, dataSouse]
}
