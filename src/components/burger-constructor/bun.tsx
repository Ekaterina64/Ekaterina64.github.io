import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'
import { getBurger } from '../../services/selectors'
import { useAppSelector } from '../../types/hooks'
import styles from './burger-constructor.module.css'

type TBunProps = { type: 'top' | 'bottom' | undefined }

const Bun: FC<Readonly<TBunProps>> = ({ type }) => {
	const { buns } = useAppSelector(getBurger)

	return (
		<>
			{buns.length > 0 && (
				<div className={styles.bun} data-testid='constructor_bun'>
					<ConstructorElement
						type={type}
						isLocked={true}
						text={`${buns[0].name} ${type === 'top' ? '(верх)' : '(низ)'}`}
						price={buns[0].price}
						thumbnail={buns[0].image}
						data-testid='constructor_element'
					/>
				</div>
			)}
		</>
	)
}

export default Bun
