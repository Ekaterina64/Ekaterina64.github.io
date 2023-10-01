import { useMemo } from "react"
import { Types } from "../utils/ingredient-types.js"

export const useFilter = (data) => {
	const getFilteredData = (data, curFilter) => {
		return data.filter( (ingredient) => {
			return ingredient.type === curFilter
		});
	};

	const dataBun = useMemo(() => getFilteredData(data, Types.BUN), [data]);
	const dataMain = useMemo(() => getFilteredData(data, Types.MAIN), [data]);
	const dataSouse = useMemo(() => getFilteredData(data, Types.SOUSE), [data]);

	return [dataBun, dataMain, dataSouse];
};