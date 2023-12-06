import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useOrder } from '../../hooks/use-order'
import { TOrderData } from '../../types/data'
import OrderIngredients from './order-ingredients'
import styles from './order.module.css'

type TOrderCard = { order: TOrderData }

const OrderCard: FC<TOrderCard> = ({ order }) => {
	const { totalPrice, orderIngredients, statusRus, matchProfile } =
		useOrder(order)
	const { name, number, createdAt, status } = order

	const location = useLocation()

	return (
		<Link
			to={`${location.pathname}/${number}`}
			state={{ background: location, number }}
			className={styles.link}
		>
			<article className={`${styles.item} p-6`}>
				<div className={styles.info}>
					<p className='text text_type_digits-default'>#{number}</p>
					<p className='text text_type_main-default text_color_inactive'>
						<FormattedDate date={new Date(createdAt)} />
					</p>
				</div>
				<p className='text text_type_main-medium mb-2 mt-6'>{name}</p>
				{matchProfile &&
					(status === 'done' ? (
						<p className='text text_type_main-default text_color_success mb-6'>
							{statusRus}
						</p>
					) : (
						<p className='text text_type_main-default text_color_primary mb-6'>
							{statusRus}
						</p>
					))}
				<div className={styles.ingredients_container}>
					<OrderIngredients ingredients={orderIngredients} />
					<div className={styles.price}>
						<p className='text text_type_digits-default mr-2'>{totalPrice}</p>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</article>
		</Link>
	)
}

export default OrderCard
