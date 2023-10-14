import {
  ConstructorElement,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types"
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { DELETE_FILLING } from '../../services/actions/burger-constructor'
import styles from "./burger-constructor.module.css"

const FillingItem = ({name, price, id, image, index, moveFilling}) => {

  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch({
      type: DELETE_FILLING,
      id: id
    });
  };

  const ref = useRef(null);
  
  const [, drop] = useDrop({
    accept: 'filling',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) {
        return
      }
      
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      const clientOffset = monitor.getClientOffset();
      
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      
      moveFilling(dragIndex, hoverIndex);
      
      item.index = hoverIndex;
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'filling',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref))

  return (
    <li ref={ref} className={styles.item} style={{ opacity }}>
      <div className={styles.ingredientContainer}>
        <button className={styles.button}>
          <DragIcon type="primary" />
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
  );
};

FillingItem.propTypes = {
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  moveFilling: PropTypes.func.isRequired
};

export default FillingItem;