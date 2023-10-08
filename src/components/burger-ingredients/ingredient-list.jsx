import PropTypes from "prop-types"
import { IngredientPropType } from "../../utils/prop-types.js"
import BurgerIngredient from "./burger-ingredient.jsx"
import styles from "./burger-ingredients.module.css"

const IngredientList = ({ingredients}) => {
	return (
		<ul className={styles.ingredientsList}>
			{ingredients.map((ingredient) => (
						<BurgerIngredient
							item={ingredient}
							count = {0}
							key = {ingredient._id}
						/>
					)
      )}
		</ul>
	);
};

IngredientList.propTypes = {
	ingredients: PropTypes.arrayOf(PropTypes.shape(IngredientPropType)).isRequired,
};

export default IngredientList;