import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'
import { React, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	CLOSE_INFO,
	getOrder,
} from '../../services/actions/burger-constructor.js'
import { getBurgerConstructor } from '../../utils/selectors.js'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import styles from './burger-constructor.module.css'
import { totalPriceSelector } from './utils.js'

const PlaceOrder = () => {
	const dispatch = useDispatch()

	const { order, orderRequest, burger } = useSelector(getBurgerConstructor)

	const totalCost = useSelector(totalPriceSelector)

	const getIngredientsIds = useMemo(
		ingredients => ingredients.map(i => i._id),
		[]
	)

	const onSubmit = () => {
		const ingredientsIds = getIngredientsIds([
			...burger.buns,
			...burger.fillings,
		])
		dispatch(getOrder(ingredientsIds))
	}

	const handleClose = useCallback(() => {
		dispatch({ type: CLOSE_INFO })
	}, [])

	return (
		<div className={classNames(styles.order, 'mt-10')}>
			<p className={classNames(styles.totalPrice, 'mr-10')}>
				<span className='text text_type_digits-medium mr-2'>{totalCost}</span>
				<CurrencyIcon type='primary' />
			</p>
			<Button htmlType='submit' type='primary' size='large' onClick={onSubmit}>
				{orderRequest ? 'Отправляем...' : 'Оформить заказ'}
			</Button>
			{order && (
				<Modal title='' onClose={handleClose}>
					<OrderDetails orderNumber={order.number} />
				</Modal>
			)}
		</div>
	)
}

export default React.memo(PlaceOrder)
