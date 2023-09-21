import BurgerIngredient from '../burger-ingredient/burger-ingredient'
import styles from "./ingredient-container.module.css"

const IngredientContainer = ({ingredients}) => {
	console.log(ingredients)
	return (
		<ul className={styles.ingredientsList}>
			{ingredients.map((ingredient) => (
						<BurgerIngredient
							name = {ingredient.name}
							price = {ingredient.price}
							image = {ingredient.image}
							key = {ingredient.id}
						/>
					)
      )}
		</ul>
	);
};

export default IngredientContainer;