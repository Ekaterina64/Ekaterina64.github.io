import classNames from "classnames"
import PropTypes from "prop-types"
import EnergyValues from './energy-values/energy-values'
import styles from "./ingredient-details.module.css"

const IngredientDetails = ({ ingredient }) => {
  return (
    <>
      <img
        className={styles.image}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <h2 className={classNames("text text_type_main-medium mt-4 mb-8", styles.ingredient_name)}>
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