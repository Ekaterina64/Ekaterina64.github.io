import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { memo, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { LOGIN } from '../../pages/index'
import { closeInfo, getOrder } from '../../services/actions/burger-constructor'
import { ACCESS_TOKEN } from '../../services/constants'
import { getBurgerConstructor, getUser } from '../../services/selectors'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { getCookie } from '../../utils/cookies'
import Booking from '../booking/booking'
import Modal from '../modal/modal'
import styles from './burger-constructor.module.css'
import { totalPriceSelector } from './utils'

const PlaceOrder = memo(() => {
	const dispatch = useAppDispatch()

	const { order, orderRequest, burger } = useAppSelector(getBurgerConstructor)
	const user = useAppSelector(getUser)
	const token = getCookie(ACCESS_TOKEN)
	const navigate = useNavigate()
	const totalCost = useAppSelector(totalPriceSelector)

	const ingredientsIds: string[] = useMemo(
		() => [...burger.buns, ...burger.fillings].map(i => i._id),
		[burger]
	)
	const handleSubmit = () => {
		if (token?.length === 0) {
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
				data-testid='button_submit'
				onClick={handleSubmit}
			>
				{orderRequest ? 'Отправляем...' : 'Оформить заказ'}
			</Button>
			{order && (
				<Modal title='' titleSize='main-large' onClose={handleClose}>
					<Booking orderNumber={order.order.number} />
				</Modal>
			)}
		</div>
	)
})

export default PlaceOrder
