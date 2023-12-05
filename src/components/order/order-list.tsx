import { useLocation } from 'react-router'
import { PROFILE_ORDERS } from '../../pages'
import { getFeeds, getOrders } from '../../services/selectors'
import { useAppSelector } from '../../types/hooks'
import OrderCard from './order-card'
import styles from './order.module.css'

const OrderList = () => {
	const profile_orders = useLocation().pathname === PROFILE_ORDERS
	const orders = useAppSelector(profile_orders ? getOrders : getFeeds)

	return (
		<section
			className={`${styles.section} mr-12 ${profile_orders ? 'mt-10' : ''}`}
		>
			<div className={`${styles.feeds} pr-2 custom-scroll`}>
				{orders?.map(order => (
					<OrderCard key={order._id} order={order} />
				))}
			</div>
		</section>
	)
}

export default OrderList
