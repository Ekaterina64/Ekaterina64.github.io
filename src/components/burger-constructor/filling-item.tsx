import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import type { XYCoord } from 'dnd-core'
import { FC, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { deleteFilling } from '../../services/actions/burger-constructor'
import { useAppDispatch } from '../../types/hooks'
import styles from './burger-constructor.module.css'

type TFillingItemProps = {
	name: string
	price: number
	id: string
	image: string
	index: number
	moveFilling: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
	index: number
	id: string
	type: string
}

const FillingItem: FC<TFillingItemProps> = ({
	name,
	price,
	id,
	image,
	index,
	moveFilling,
}) => {
	const dispatch = useAppDispatch()

	const onDelete = () => {
		dispatch(deleteFilling(id))
	}

	const ref = useRef<HTMLLIElement>(null)

	const [, drop] = useDrop<DragItem, void>({
		accept: 'filling',
		hover(item: DragItem, monitor) {
			if (!ref.current) {
				return
			}
			const dragIndex = item.index
			const hoverIndex = index

			if (dragIndex === hoverIndex) {
				return
			}

			const hoverBoundingRect = ref.current?.getBoundingClientRect()

			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

			const clientOffset = monitor.getClientOffset()

			const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return
			}

			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return
			}

			moveFilling(dragIndex, hoverIndex)

			item.index = hoverIndex
		},
	})
	const [{ isDragging }, drag] = useDrag({
		type: 'filling',
		item: () => {
			return { id, index }
		},
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})
	const opacity = isDragging ? 0 : 1
	drag(drop(ref))

	return (
		<li ref={ref} className={styles.item} style={{ opacity }}>
			<div className={styles.ingredientContainer}>
				<button className={styles.button}>
					<DragIcon type='primary' />
				</button>
				<ConstructorElement
					text={name}
					price={price}
					thumbnail={image}
					extraClass={styles.element}
					handleClose={onDelete}
				/>
			</div>
		</li>
	)
}

export default FillingItem
