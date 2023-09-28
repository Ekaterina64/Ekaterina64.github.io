import classNames from "classnames"
import PropTypes from "prop-types"
import styles from "../modal/modal.module.css"
import EnergyValues from './energy-values/energy-values'

const IngredientDetails = ({ ingredient }) => {
  return (
    <>
      <img
        className={styles.image}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <h2 className={classNames("text text_type_main-medium mt-4 mb-8", styles.title)}>
        {ingredient.name}
      </h2>
      <EnergyValues {...ingredient} />
    </>
  );
};

IngredientDetails.propTypes = {
	ingredient: PropTypes.object.isRequired
};

export default IngredientDetails;