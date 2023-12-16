import { useParams } from 'react-router'
import { getIngredientById } from '../../services/actions/burger-ingredients'
import { useAppSelector } from '../../types/hooks'
import EnergyValues from './energy-values/energy-values'
import styles from './ingredient-details.module.css'

const IngredientDetails = () => {
	const { id } = useParams()

	const ingredient = useAppSelector(getIngredientById(id as string))

	if (!ingredient) {
		return <div>Ingredient not found</div>
	}
	return (
		<>
			<img
				className={styles.image}
				src={ingredient.image_large}
				alt={ingredient.name}
			/>
			<h2
				className={`
					text text_type_main-medium mt-4 mb-8
					${styles.ingredient_name}
				`}
				data-testid='ingredient_name'
			>
				{ingredient.name}
			</h2>
			<EnergyValues {...ingredient} />
		</>
	)
}

export default IngredientDetails
