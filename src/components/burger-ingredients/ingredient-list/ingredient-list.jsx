import PropTypes from "prop-types"
import { IngredientPropType } from "../../../utils/prop-types.js"
import styles from "../burger-ingredients.module.css"
import BurgerIngredient from "./burger-ingredient/burger-ingredient"

const IngredientList = ({ingredients, onClick}) => {
	return (
		<ul className={styles.ingredientsList}>
			{ingredients.map((ingredient) => (
						<BurgerIngredient
							item={ingredient}
							count = {0}
							key = {ingredient._id}
							onClick={onClick}
						/>
					)
      )}
		</ul>
	);
};

IngredientList.propTypes = {
	ingredients: PropTypes.arrayOf(PropTypes.shape(IngredientPropType)).isRequired,
	onClick: PropTypes.func.isRequired
};

export default IngredientList;