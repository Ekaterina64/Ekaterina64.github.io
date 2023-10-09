import {
  ConstructorElement,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types"
import { useDispatch } from 'react-redux'
import { DELETE_FILLING } from '../../services/actions/burger-constructor'
import styles from "./burger-constructor.module.css"

const FillingItem = ({name, price, id, image}) => {

  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch({
      type: DELETE_FILLING,
      id: id
    });
  };

  return (
    <li className={styles.item}>
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
  id: PropTypes.string.isRequired
};

export default FillingItem;