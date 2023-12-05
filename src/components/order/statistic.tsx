import { getOrdersData } from '../../services/selectors'
import { TOrderData } from '../../types/data'
import { useAppSelector } from '../../types/hooks'

import styles from './order.module.css'

const Statistic = () => {
	const { total, totalToday, orders } = useAppSelector(getOrdersData)

	return (
		<section className='ml-15'>
			<div className={`${styles.status} mb-15`}>
				<div className={`${styles.groupStatus} mr-9`}>
					<h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
					<div className={styles.numbers}>
						{orders
							?.slice(0, 30)
							.filter((item: TOrderData) => item.status === 'done')
							.map((item: TOrderData) => (
								<p
									key={item.number}
									className={`${styles.doneNumber} text text_type_digits-default mb-2`}
								>
									{item.number}
								</p>
							))}
					</div>
				</div>
				<div className={styles.groupStatus}>
					<h3 className='text text_type_main-medium mb-6'>В работе:</h3>
					<div className={styles.numbers}>
						{orders
							?.slice(0, 20)
							.filter((item: TOrderData) => item.status === 'pending')
							.map((item: TOrderData) => (
								<p
									key={item.number}
									className='text text_type_digits-default mb-2'
								>
									{item.number}
								</p>
							))}
					</div>
				</div>
			</div>
			<h3 className='text text_type_main-medium'>Выполнено за все время:</h3>
			<p className={`${styles.number} text text_type_digits-large`}>{total}</p>
			<h3 className='text text_type_main-medium mt-15'>
				Выполнено за сегодня:
			</h3>
			<p className={`${styles.number} text text_type_digits-large`}>
				{totalToday}
			</p>
		</section>
	)
}

export default Statistic
