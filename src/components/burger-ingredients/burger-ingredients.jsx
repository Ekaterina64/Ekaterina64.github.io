import classNames from "classnames"
import PropTypes from "prop-types"
import { useFilter } from "../../hooks/use-filter.js"
import { Types } from "../../utils/ingredient-types.js"
import { IngredientPropType } from "../../utils/prop-types.js"
import styles from "./burger-ingredients.module.css"
import IngredientList from "./ingredient-list/ingredient-list.jsx"
import TabContainer from "./tab-container/tab-container.jsx"

const BurgerIngredients = ({data, onClick}) => {
	const [ dataBun, dataMain, dataSouse ] = useFilter(data);
	
  return (
    <div className={styles.section}>
      <h1 className={"text text_type_main-large mb-5 mt-10"}>
        Соберите бургер
      </h1>
      <TabContainer types={Types}/>
			<div className={classNames(styles.ingredientsContainer, "custom-scroll")}>
				<h2 id={Types.BUN} className="text text_type_main-medium mb-6">Булки</h2>
				<IngredientList ingredients={dataBun} onClick={onClick}/>
				<h2 id={Types.SOUSE} className="text text_type_main-medium mb-6 mt-10">Соусы</h2>
				<IngredientList ingredients={dataSouse} onClick={onClick}/>
				<h2 id={Types.MAIN} className="text text_type_main-medium mb-6 mt-10">Начинки</h2>
				<IngredientList ingredients={dataMain} onClick={onClick}/>
			</div>
    </div>
  );
};

BurgerIngredients.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape(IngredientPropType)).isRequired,
	onClick: PropTypes.func.isRequired
};

export default BurgerIngredients;