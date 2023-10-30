import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useDrag } from 'react-dnd'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { IngredientPropType } from '../../utils/prop-types.js'
import { getBurger } from '../../utils/selectors.js'
import styles from './burger-ingredients.module.css'

const BurgerIngredient = ({ item }) => {
	const location = useLocation()

	const [{ opacity }, ref] = useDrag({
		type: 'ingredient',
		item: { ...item },
		collect: monitor => ({
			opacity: monitor.isDragging() ? 0.5 : 1,
		}),
	})

	const { buns, fillings } = useSelector(getBurger)

	const count = useMemo(() => {
		const ingredients = [...buns, ...fillings]
		return ingredients.filter(ingredient => ingredient._id === item._id).length
	}, [buns, fillings])

	return (
		<li className={styles.item}>
			<Link
				to={`/ingredients/${item._id}`}
				state={{ backgroundLocation: location }}
				className={styles.link}
			>
				<div ref={ref} style={{ opacity }}>
					{count > 0 && <Counter count={count} size='default' />}
					<img className='ml-4 mr-4' src={item.image} alt='Ингредиент' />
					<div className={`mt-2 mb-2 ${styles.price}`}>
						<p className='text text_type_digits-default mr-2'>{item.price}</p>
						<CurrencyIcon />
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

BurgerIngredient.propTypes = {
	item: PropTypes.shape(IngredientPropType).isRequired,
}

export default BurgerIngredient
