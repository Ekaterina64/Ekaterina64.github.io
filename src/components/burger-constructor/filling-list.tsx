import { useDispatch, useSelector } from 'react-redux'
import { MOVE_FILLING } from '../../services/actions/burger-constructor'
import { getBurger } from '../../utils/selectors'
import styles from './burger-constructor.module.css'
import FillingItem from './filling-item'
interface IIngredient {
	name: string
	price: number
	image: string
	id: string
}
const FillingList = () => {
	const { fillings } = useSelector(getBurger)
	const dispatch = useDispatch()

	const handleMove = (dragIndex: number, hoverIndex: number) => {
		dispatch({
			type: MOVE_FILLING,
			dragIndex: dragIndex,
			hoverIndex: hoverIndex,
		})
	}
	return (
		<ul className={`${styles.list} custom-scroll mt-4 mb-4 pl-4 pr-1`}>
			{fillings.map((fillingItem: IIngredient, index: number) => {
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
