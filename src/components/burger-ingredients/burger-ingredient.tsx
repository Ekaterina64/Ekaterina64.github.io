import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { FC, useMemo } from 'react'
import { useDrag } from 'react-dnd'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { getBurger } from '../../services/selectors'
import { TIngredient } from '../../types/data'
import { useAppSelector } from '../../types/hooks'
import styles from './burger-ingredients.module.css'

type TBurgerIngredientProps = {
	item: TIngredient
}
const BurgerIngredient: FC<TBurgerIngredientProps> = ({ item }) => {
	const location = useLocation()

	const [{ opacity }, ref] = useDrag({
		type: 'ingredient',
		item: { ...item },
		collect: monitor => ({
			opacity: monitor.isDragging() ? 0.5 : 1,
		}),
	})

	const { buns, fillings } = useAppSelector(getBurger)

	const count = useMemo(() => {
		const ingredients = [...buns, ...fillings]
		return ingredients.filter(ingredient => ingredient._id === item._id).length
	}, [buns, fillings])

	return (
		<li className={styles.item}>
			<Link
				to={`/ingredients/${item._id}`}
				state={{ ingredientBackground: location }}
				className={styles.link}
			>
				<div ref={ref} style={{ opacity }}>
					{count > 0 && <Counter count={count} size='default' />}
					<img className='ml-4 mr-4' src={item.image} alt='Ингредиент' />
					<div className={`mt-2 mb-2 ${styles.price}`}>
						<p className='text text_type_digits-default mr-2'>{item.price}</p>
						<CurrencyIcon type='primary' />
					</div>
					<p
						className={`
							text text_type_main-default
							${styles.ingredientName}`}
					>
						{item.name}
					</p>
				</div>
			</Link>
		</li>
	)
}

export default BurgerIngredient
