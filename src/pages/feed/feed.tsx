import { useEffect } from 'react'
import OrderList from '../../components/order/order-list'
import Statistic from '../../components/order/statistic'
import {
	connect as feedWsConnect,
	disconnect as feedWsDisconnect,
} from '../../services/actions/feedWs'
import { NORMA_WSS } from '../../services/constants'
import { getFeeds } from '../../services/selectors'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { Loader } from '../../ui/loader/loader'
import styles from './feed-page.module.css'

const FeedPage = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(feedWsConnect(`${NORMA_WSS}/all`))
		return () => {
			dispatch(feedWsDisconnect(1000))
		}
	}, [dispatch])
	const orders = useAppSelector(getFeeds)

	return (
		<main className={styles.main}>
			{orders.length > 0 ? (
				<>
					<h1 className='text text_type_main-large mb-5 mt-10'>
						Лента заказов
					</h1>
					<div className={styles.container}>
						<OrderList />
						<Statistic />
					</div>
				</>
			) : (
				<Loader size='large' />
			)}
		</main>
	)
}

export default FeedPage
