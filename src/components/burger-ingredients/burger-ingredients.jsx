import classNames from "classnames"
import ingredientsdata from "../../utils/data.js"
import IngredientContainer from '../ingredient-container/ingredient-container'
import TabContainer from '../tab-container/tab-container'
import styles from "./burger-ingredients.module.css"

const BurgerIngredients = () => {

	const Type = {
		MAIN: "main",
		SOUSE: "sauce",
		BUN: "bun"
	};

	const dataBun = ingredientsdata.filter( (ingredient) => {return ingredient.type === Type.BUN});
	const dataMain = ingredientsdata.filter( (ingredient) => {return ingredient.type === Type.MAIN});
	const dataSouse = ingredientsdata.filter( (ingredient) => {return ingredient.type === Type.SOUSE});

  return (
    <section className={styles.section}>
      <h1 className={"text text_type_main-large mb-5 mt-10"}>
        Соберите бургер
      </h1>
      <TabContainer/>
			<div className={classNames(styles.ingredientsContainer, "custom-scroll")}>
				<h2 className="text text_type_main-medium mb-6">Булки</h2>
				<IngredientContainer ingredients={dataBun} type={Type.BUN}/>
				<h2 className="text text_type_main-medium mb-6 mt-10">Соусы</h2>
				<IngredientContainer ingredients={dataSouse} type={Type.SOUSE}/>
				<h2 className="text text_type_main-medium mb-6 mt-10">Начинки</h2>
				<IngredientContainer ingredients={dataMain} type={Type.MAIN}/>
			</div>
    </section>
  )
}

export default BurgerIngredients;