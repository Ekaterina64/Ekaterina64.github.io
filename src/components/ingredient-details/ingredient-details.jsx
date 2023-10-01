import classNames from "classnames"
import { IngredientPropType } from "../../utils/prop-types.js"
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
	ingredient: IngredientPropType.isRequired,
};

export default IngredientDetails;