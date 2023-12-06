import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'
import { TIngredient } from '../../types/data'
import { Types } from '../../utils/ingredient-types'
import styles from './burger-composition.module.css'

type TBurgerCompositionProps = {
	ingredients: Array<TIngredient>
}

export const BurgerComposition: FC<TBurgerCompositionProps> = ({
	ingredients,
}) => {
	function counter(ingredient: TIngredient) {
		let counter = 0
		ingredients.forEach(el => {
			if (el._id === ingredient._id) {
				counter += 1
			}
		})
		if (ingredient.type === Types.BUN && counter !== 2) {
			counter += 1
		}
		return counter
	}

	const ingredientsList = Array.from(new Set(ingredients))

	return (
		<div className={styles.container}>
			<p className='text text_type_main-medium mb-6'>Состав:</p>
			<ul className={styles.list + ' custom-scroll'}>
				{ingredientsList.map((ingredient, index) => (
					<li className={styles.wrapper} key={index}>
						<div className={styles.card_container}>
							<div className={styles.imgContainer}>
								<img
									className={styles.image}
									src={ingredient.image_mobile}
									alt={ingredient.name}
								/>
							</div>
							<p className={'text text_type_main-default ' + styles.name}>
								{ingredient.name}
							</p>
						</div>
						<div className={styles.price}>
							<p className='text text_type_digits-default'>{`${counter(
								ingredient
							)} x ${ingredient.price}`}</p>
							<CurrencyIcon type='primary' />
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
