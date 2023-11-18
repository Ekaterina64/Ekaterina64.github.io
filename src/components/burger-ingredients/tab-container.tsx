import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'
import { Types } from '../../utils/ingredient-types'
import styles from './burger-ingredients.module.css'

type TTabContainerProps = {
	current: string
	onClick: (value: string) => void
}

const TabContainer: FC<TTabContainerProps> = ({ current, onClick }) => {
	return (
		<div className={`${styles.tabContainer} mb-10`}>
			<Tab value={Types.BUN} active={current === Types.BUN} onClick={onClick}>
				Булки
			</Tab>
			<Tab
				value={Types.SOUSE}
				active={current === Types.SOUSE}
				onClick={onClick}
			>
				Соусы
			</Tab>
			<Tab value={Types.MAIN} active={current === Types.MAIN} onClick={onClick}>
				Начинки
			</Tab>
		</div>
	)
}

export default TabContainer
