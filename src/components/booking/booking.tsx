import { FC } from 'react'
import iconDone from '../../images/done.svg'
import styles from './booking.module.css'

type TBookingProps = { readonly orderNumber: number }

const Booking: FC<TBookingProps> = ({ orderNumber }) => {
	return (
		<>
			<div className={styles.booking}>
				<h1
					className={`
						text text_type_digits-large mb-15
						${styles.orderNumber}
					`}
				>
					{orderNumber}
				</h1>
				<p className='text text_type_main-medium mb-8'>идентификатор заказа</p>
				<img className='mb-15' src={iconDone} alt='Заказ принят' />
				<p className='text text_type_main-default pb-2'>
					Ваш заказ начали готовить
				</p>
				<p className='text text_type_main-default pb-15 text_color_inactive'>
					Дождитесь готовности на орбитальной станции
				</p>
			</div>
		</>
	)
}

export default Booking
