import { useSelector } from 'react-redux'
import IngredientDetails from '../../components/ingredient-details/ingredient-details'

import { getBurgerIngredients } from '../../services/selectors'
import { Loader } from '../../ui/loader/loader'
import styles from './ingredient.module.css'

const IngredientPage = () => {
	const { ingredientsRequest } = useSelector(getBurgerIngredients)

	if (ingredientsRequest) {
		return <Loader size='large' />
	}

	return (
		<section className={styles.main}>
			<div className={styles.container}>
				<p className={`${styles.title} text text_type_main-large`}>
					Детали ингредиента
				</p>
				<IngredientDetails />
			</div>
		</section>
	)
}

export default IngredientPage
