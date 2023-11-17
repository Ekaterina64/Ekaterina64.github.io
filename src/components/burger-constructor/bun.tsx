import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { getBurger } from '../../utils/selectors'
import styles from './burger-constructor.module.css'

type TBunProps = { type: 'top' | 'bottom' | undefined }

const Bun: FC<Readonly<TBunProps>> = ({ type }) => {
	const { buns } = useSelector(getBurger)

	return (
		<>
			{buns.length > 0 && (
				<div className={styles.bun}>
					<ConstructorElement
						type={type}
						isLocked={true}
						text={`${buns[0].name} ${type === 'top' ? '(верх)' : '(низ)'}`}
						price={buns[0].price}
						thumbnail={buns[0].image}
					/>
				</div>
			)}
		</>
	)
}

export default Bun
