import { useDrop } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid'
import { addBun, addFilling } from '../../services/actions/burger-constructor'
import { TBurgerIngredient, TIngredient } from '../../types/data'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { Types } from '../../utils/ingredient-types'
import { getBurger } from '../../utils/selectors'
import Burger from './burger'
import styles from './burger-constructor.module.css'
import PlaceOrder from './place-order'

const BurgerConstructor = () => {
	const dispatch = useAppDispatch()
	const burger = useAppSelector(getBurger)

	const [{ canDrop }, dropTarget] = useDrop<
		TIngredient,
		void,
		{ canDrop: boolean }
	>({
		accept: 'ingredient',
		collect: monitor => ({
			canDrop: monitor.canDrop(),
		}),
		drop: (item: TIngredient) => {
			addIngredient({ ...item, id: uuidv4() })
		},
	})

	const addIngredient = (item: TBurgerIngredient) => {
		if (item.type === Types.BUN) {
			dispatch(addBun(item))
		} else {
			dispatch(addFilling(item))
		}
	}
	const className = `${styles.burgerConstructor}
										 ${canDrop ? styles.drop : ''}
										 mt-25 `
	return (
		<div className={`${className}`} ref={dropTarget}>
			{burger.buns.length || burger.fillings.length ? (
				<>
					<Burger />
					<PlaceOrder />
				</>
			) : (
				<p className='text text_type_main-large'>
					Перетащите ингредиенты для составления бургера
				</p>
			)}
		</div>
	)
}

export default BurgerConstructor
