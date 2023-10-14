import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { MOVE_FILLING } from '../../services/actions/burger-constructor'
import styles from './burger-constructor.module.css'
import FillingItem from './filling-item.jsx'

const FillingList = () => {
	const { fillings } = useSelector(state => state.burgerConstructor.burger)
	const dispatch = useDispatch()

	const handleMove = (dragIndex, hoverIndex) => {
		dispatch({
			type: MOVE_FILLING,
			dragIndex: dragIndex,
			hoverIndex: hoverIndex,
		})
	}
	return (
		<ul
			className={classNames(styles.list, 'custom-scroll mt-4 mb-4 pl-4 pr-1')}
		>
			{fillings.map((fillingItem, index) => {
				return (
					<FillingItem
						name={fillingItem.name}
						price={fillingItem.price}
						image={fillingItem.image}
						key={fillingItem.id}
						id={fillingItem.id}
						index={index}
						moveFilling={handleMove}
					/>
				)
			})}
		</ul>
	)
}

export default FillingList
