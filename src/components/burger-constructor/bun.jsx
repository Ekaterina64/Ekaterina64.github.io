import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getBurger } from '../../utils/selectors.js'
import styles from './burger-constructor.module.css'

const Bun = ({ type }) => {
	const { buns } = useSelector(getBurger)

	return (
		<>
			{buns.length && (
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

Bun.propTypes = {
	type: PropTypes.string.isRequired,
}

export default Bun
