import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { PROFILE_ORDERS } from '..'
import OrderDetails from '../../components/order-details/order-details'
import { ACCESS_TOKEN, NORMA_WSS } from '../../services/constants'
import { useAppDispatch } from '../../types/hooks'
import { getCookie } from '../../utils/cookies'
import styles from './order-info.module.css'

import {
	connect as feedWsConnect,
	disconnect as feedWsDisconnect,
} from '../../services/actions/feedWs'
import {
	connect as orderWsConnect,
	disconnect as orderWsDisconnect,
} from '../../services/actions/orderWs'

const OrderInfoPage = () => {
	const dispatch = useAppDispatch()
	const profile_orders = useLocation().pathname === PROFILE_ORDERS
	const token = getCookie(ACCESS_TOKEN)

	useEffect(() => {
		profile_orders
			? dispatch(orderWsConnect(`${NORMA_WSS}?token=${token}`))
			: dispatch(feedWsConnect(`${NORMA_WSS}/all`))
		return () => {
			profile_orders
				? dispatch(orderWsDisconnect(1000))
				: dispatch(feedWsDisconnect(1000))
		}
	}, [dispatch, profile_orders, token])

	return (
		<section className={styles.section}>
			<OrderDetails showTitle={true} />
		</section>
	)
}

export default OrderInfoPage
