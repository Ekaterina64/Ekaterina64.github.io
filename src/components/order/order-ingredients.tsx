import { FC } from 'react'
import { TIngredient } from '../../types/data'
import styles from './order.module.css'

type TOrderIngredient = { ingredients: TIngredient[] }
const maxDisplayedIngredients = 4

const OrderIngredients: FC<TOrderIngredient> = ({ ingredients }) => {
	return (
		<div className={styles.ingredients}>
			{ingredients.slice(0, maxDisplayedIngredients).map((ingredient, id) => (
				<div key={id} className={styles.ingredient}>
					<img
						className={styles.image}
						style={{
							opacity:
								id === maxDisplayedIngredients - 1 &&
								id !== ingredients.length - 1
									? 0.6
									: 1,
						}}
						src={ingredient?.image}
						alt={ingredient?.name}
					/>
					{id === maxDisplayedIngredients - 1 &&
						id !== ingredients.length - 1 && (
							<p className={`${styles.tip} text text_type_main-default`}>
								+ {ingredients.length - maxDisplayedIngredients + 1}
							</p>
						)}
				</div>
			))}
		</div>
	)
}

export default OrderIngredients
