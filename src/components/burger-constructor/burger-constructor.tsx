import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { ADD_BUN, ADD_FILLING } from '../../services/actions/burger-constructor'
import { TIngredient } from '../../types/types'
import { Types } from '../../utils/ingredient-types'
import { getBurger } from '../../utils/selectors'
import Burger from './burger'
import styles from './burger-constructor.module.css'
import PlaceOrder from './place-order'

const BurgerConstructor = () => {
	const dispatch = useDispatch()
	const burger = useSelector(getBurger)

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

	const addIngredient = (item: TIngredient & { id: string }) => {
		if (item.type === Types.BUN) {
			dispatch({
				type: ADD_BUN,
				bun: item,
			})
		} else {
			dispatch({
				type: ADD_FILLING,
				filling: item,
			})
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
