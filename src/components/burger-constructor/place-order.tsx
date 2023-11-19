import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { memo, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { LOGIN } from '../../pages/index'
import {
	closeInfo,
	getOrder,
} from '../../services/actions/burger-constructor.js'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { getBurgerConstructor, getUser } from '../../utils/selectors'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import styles from './burger-constructor.module.css'
import { totalPriceSelector } from './utils'

const PlaceOrder = memo(() => {
	const dispatch = useAppDispatch()

	const { order, orderRequest, burger } = useAppSelector(getBurgerConstructor)
	const user = useAppSelector(getUser)
	const navigate = useNavigate()

	const totalCost = useAppSelector(totalPriceSelector)

	const ingredientsIds: string[] = useMemo(
		() => [...burger.buns, ...burger.fillings].map(i => i._id),
		[burger]
	)
	const handleSubmit = () => {
		if (!user) {
			navigate(LOGIN)
		} else {
			dispatch(getOrder(ingredientsIds))
		}
	}

	const handleClose = useCallback(() => {
		dispatch(closeInfo())
	}, [])

	return (
		<div className={`${styles.order} mt-10`}>
			<p className={`${styles.totalPrice} mr-10`}>
				<span className='text text_type_digits-medium mr-2'>{totalCost}</span>
				<CurrencyIcon type='primary' />
			</p>
			<Button
				htmlType='submit'
				type='primary'
				size='large'
				onClick={handleSubmit}
			>
				{orderRequest ? 'Отправляем...' : 'Оформить заказ'}
			</Button>
			{order && (
				<Modal title='' onClose={handleClose}>
					<OrderDetails orderNumber={order.order.number} />
				</Modal>
			)}
		</div>
	)
})

export default PlaceOrder
