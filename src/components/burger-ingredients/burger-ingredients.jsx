import classNames from "classnames"
import { useContext, useState } from 'react'
import { useFilter } from "../../hooks/use-filter.js"
import { IngredientsDataContext } from '../../services/app-context.js'
import { Types } from "../../utils/ingredient-types.js"
import IngredientDetails from '../ingredient-details/ingredient-details.jsx'
import Modal from '../modal/modal'
import styles from "./burger-ingredients.module.css"
import IngredientList from "./ingredient-list/ingredient-list.jsx"
import TabContainer from "./tab-container/tab-container.jsx"

const BurgerIngredients = () => {
	const data = useContext(IngredientsDataContext);
	const [ dataBun, dataMain, dataSouse ] = useFilter(data);

	const [isModalIngredientsDetailsOpened, setIsModalIngredientsDetailsOpened] = useState(false);
	const [selectedIngredient, setSelectedIngredient] = useState(null);

	const onModalIngredientDetailsClose = () => {
    setIsModalIngredientsDetailsOpened(false);
  };

	function handleClick(ingredient) {
    setIsModalIngredientsDetailsOpened(true);
    setSelectedIngredient(ingredient);
  };
	
  return (
    <div className={styles.section}>
      <h1 className={"text text_type_main-large mb-5 mt-10"}>
        Соберите бургер
      </h1>
      <TabContainer types={Types}/>
			<div className={classNames(styles.ingredientsContainer, "custom-scroll")}>
				<h2 id={Types.BUN} className="text text_type_main-medium mb-6">Булки</h2>
				<IngredientList ingredients={dataBun} onClick={handleClick}/>
				<h2 id={Types.SOUSE} className="text text_type_main-medium mb-6 mt-10">Соусы</h2>
				<IngredientList ingredients={dataSouse} onClick={handleClick}/>
				<h2 id={Types.MAIN} className="text text_type_main-medium mb-6 mt-10">Начинки</h2>
				<IngredientList ingredients={dataMain} onClick={handleClick}/>
			</div>
			{ isModalIngredientsDetailsOpened &&
				<Modal
					title='Детали ингредиента'
					onClose={onModalIngredientDetailsClose}
				>
					{selectedIngredient && (
						<IngredientDetails ingredient={selectedIngredient}/>
					)}
				</Modal>
      }
    </div>
  );
};

export default BurgerIngredients;