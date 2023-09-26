import classNames from "classnames"
import { useFilter } from "../../hooks/use-filter.js"
import { Types } from "../../utils/ingredient-types.js"
import styles from "./burger-ingredients.module.css"
import IngredientList from "./ingredient-list/ingredient-list.jsx"
import TabContainer from "./tab-container/tab-container.jsx"

const BurgerIngredients = ({data}) => {
	const [ dataBun, dataMain, dataSouse ] = useFilter(data);
	
  return (
    <div className={styles.section}>
      <h1 className={"text text_type_main-large mb-5 mt-10"}>
        Соберите бургер
      </h1>
      <TabContainer types={Types}/>
			<div className={classNames(styles.ingredientsContainer, "custom-scroll")}>
				<h2 id={Types.BUN} className="text text_type_main-medium mb-6">Булки</h2>
				<IngredientList ingredients={dataBun}/>
				<h2 id={Types.SOUSE} className="text text_type_main-medium mb-6 mt-10">Соусы</h2>
				<IngredientList ingredients={dataSouse}/>
				<h2 id={Types.MAIN} className="text text_type_main-medium mb-6 mt-10">Начинки</h2>
				<IngredientList ingredients={dataMain}/>
			</div>
    </div>
  );
};

export default BurgerIngredients;