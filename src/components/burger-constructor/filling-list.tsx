import { moveFilling } from '../../services/actions/burger-constructor'
import { getBurger } from '../../services/selectors'
import { TBurgerIngredient } from '../../types/data'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import styles from './burger-constructor.module.css'
import FillingItem from './filling-item'

const FillingList = () => {
	const { fillings } = useAppSelector(getBurger)
	const dispatch = useAppDispatch()

	const handleMove = (dragIndex: number, hoverIndex: number) => {
		dispatch(moveFilling(dragIndex, hoverIndex))
	}
	return (
		<ul className={`${styles.list} custom-scroll mt-4 mb-4 pl-4 pr-1`}>
			{fillings.map((fillingItem: TBurgerIngredient, index: number) => {
				return (
					<FillingItem
						name={fillingItem.name}
						price={fillingItem.price}
						image={fillingItem.image}
						key={fillingItem.id}
						id={fillingItem.id as string}
						index={index}
						moveFilling={handleMove}
					/>
				)
			})}
		</ul>
	)
}

export default FillingList
