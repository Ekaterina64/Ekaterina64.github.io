import styles from "../burger-ingredients.module.css"
import BurgerIngredient from "./burger-ingredient/burger-ingredient"

const IngredientList = ({ingredients}) => {
	return (
		<ul className={styles.ingredientsList}>
			{ingredients.map((ingredient) => (
						<BurgerIngredient
							name = {ingredient.name}
							price = {ingredient.price}
							image = {ingredient.image}
							count = {0}
							key = {ingredient._id}
						/>
					)
      )}
		</ul>
	);
};

export default IngredientList;