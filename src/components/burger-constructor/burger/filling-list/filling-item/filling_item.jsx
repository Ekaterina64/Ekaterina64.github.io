import {
  ConstructorElement,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types"
import styles from "../../../burger-constructor.module.css"

const FillingItem = (props) => {
  return (
    <li className={styles.item}>
      <div className={styles.ingredientContainer}>
        <button className={styles.button}>
          <DragIcon type="primary" />
        </button>
        <ConstructorElement
          text={props.name}
          price={props.price}
          thumbnail={props.image}
          extraClass={styles.element}
        />
      </div>
    </li>
  );
};

FillingItem.propTypes = {
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
};

export default FillingItem;