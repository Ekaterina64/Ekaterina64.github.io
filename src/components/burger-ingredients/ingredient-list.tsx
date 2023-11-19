import { FC } from 'react'
import { TIngredient } from '../../types/data'
import BurgerIngredient from './burger-ingredient'
import styles from './burger-ingredients.module.css'

type TIngredientListProps = {
	ingredients: TIngredient[]
}
const IngredientList: FC<TIngredientListProps> = ({ ingredients }) => {
	return (
		<ul className={styles.ingredientsList}>
			{ingredients.map(ingredient => (
				<BurgerIngredient item={ingredient} key={ingredient._id} />
			))}
		</ul>
	)
}

export default IngredientList
