import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { memo, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { LOGIN } from '../../pages/index.jsx'
import {
	CLOSE_INFO,
	getOrder,
} from '../../services/actions/burger-constructor.js'
import { getBurgerConstructor, getUser } from '../../utils/selectors.js'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import styles from './burger-constructor.module.css'
import { totalPriceSelector } from './utils.js'

const PlaceOrder = memo(() => {
	const dispatch = useDispatch()

	const { order, orderRequest, burger } = useSelector(getBurgerConstructor)
	const user = useSelector(getUser)
	const navigate = useNavigate()

	const totalCost = useSelector(totalPriceSelector)

	const ingredientsIds = useMemo(
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
		dispatch({ type: CLOSE_INFO })
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
					<OrderDetails orderNumber={order.number} />
				</Modal>
			)}
		</div>
	)
})

export default PlaceOrder
