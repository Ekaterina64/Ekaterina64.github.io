import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useOrder } from '../../hooks/use-order'
import { PROFILE_ORDERS } from '../../pages'
import { getUserOrderByNumber } from '../../services/actions/burger-constructor'
import { getFeeds, getOrders, getSelectedOrder } from '../../services/selectors'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { Loader } from '../../ui/loader/loader'
import { BurgerComposition } from '../burger-composition/burger-composition'
import styles from './order-details.module.css'

type TOrderDetailsProps = {
	showTitle: boolean
}
const OrderDetails: FC<TOrderDetailsProps> = ({ showTitle }) => {
	const { number } = useParams()
	const dispatch = useAppDispatch()
	const profile = useLocation().pathname.startsWith(PROFILE_ORDERS)

	const allOrders = useAppSelector(profile ? getOrders : getFeeds)
	const wsOrder = allOrders.find(item => item?.number === Number(number))
	const userOrder = useAppSelector(getSelectedOrder)

	useEffect(() => {
		if (!wsOrder) {
			dispatch(getUserOrderByNumber(number))
		}
	}, [dispatch, number, wsOrder])

	const order = wsOrder ? wsOrder : userOrder
	const { totalPrice, orderIngredients, statusRus } = useOrder(order)

	return (
		<div className={styles.wrapper}>
			{order ? (
				<>
					<div className={styles.header}>
						{showTitle && (
							<p
								className={
									'text text_type_digits-default mb-10 ' + styles.title
								}
							>{`#${number}`}</p>
						)}
						<p className='text text_type_main-medium mb-2'>{`${order?.name}`}</p>
						{order.status === 'done' ? (
							<p className='text text_type_main-default text_color_success'>
								{statusRus}
							</p>
						) : (
							<p className='text text_type_main-default text_color_primary'>
								{statusRus}
							</p>
						)}
					</div>
					<BurgerComposition ingredients={orderIngredients} />
					<div className={styles.container}>
						<p className='text text_type_main-default text_color_inactive'>
							<FormattedDate date={new Date(order.createdAt)} />{' '}
						</p>
						<div className={styles.price}>
							<CurrencyIcon type='primary' />
							<p className='text text_type_digits-default'>{totalPrice}</p>
						</div>
					</div>
				</>
			) : (
				<Loader size='large' />
			)}
		</div>
	)
}

export default OrderDetails
