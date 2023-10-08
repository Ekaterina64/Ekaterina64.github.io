import classNames from "classnames"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFilter } from "../../hooks/use-filter.js"
import { useTabs } from '../../hooks/use-tab.js'
import { CLOSE_INFO, getIngredients } from '../../services/actions/burger-ingredients.js'
import { Loader } from '../../ui/loader/loader.jsx'
import { Types } from "../../utils/ingredient-types.js"
import IngredientDetails from '../ingredient-details/ingredient-details.jsx'
import Modal from '../modal/modal'
import styles from "./burger-ingredients.module.css"
import IngredientList from "./ingredient-list.jsx"
import TabContainer from "./tab-container"

const BurgerIngredients = () => {
	const dispatch = useDispatch();
  const {
    ingredients,
    ingredientsRequest,
		ingredientsFailed,
		infoAboutIngredient,
		showInfo
  } = useSelector(state => state.burgerIngredients);

	const [
		currentTab,
		bunsRef,
		sousesRef,
		mainRef,
		onTabClick
	] = useTabs();

	const [
		dataBun,
		dataMain,
		dataSouse
	] = useFilter(ingredients);

	useEffect(
    () => {
      if (!ingredients.length) dispatch(getIngredients());
    },
    [dispatch]
  );

	const handleClose = () => {
		dispatch({type: CLOSE_INFO});
	}

	if(ingredientsRequest) {
		return (
			<Loader size="large" />
		)
	}
	else if(ingredientsFailed) {
		return <p>Что-то пошло не так... Попробуйте перезагрузить</p>
	}
	
  return (
    <div className={styles.section}>
      <h1 className={"text text_type_main-large mb-5 mt-10"}>
        Соберите бургер
      </h1>
      <TabContainer
				current={currentTab}
				onClick={onTabClick}
			/>
			<div className={classNames(styles.ingredientsContainer, "custom-scroll")}>
				<h2 ref={bunsRef} id={Types.BUN} className="text text_type_main-medium mb-6">Булки</h2>
				<IngredientList ingredients={dataBun}/>
				<h2 ref={sousesRef} id={Types.SOUSE} className="text text_type_main-medium mb-6 mt-10">Соусы</h2>
				<IngredientList ingredients={dataSouse}/>
				<h2 ref={mainRef} id={Types.MAIN} className="text text_type_main-medium mb-6 mt-10">Начинки</h2>
				<IngredientList ingredients={dataMain}/>
			</div>
			{ showInfo &&
				<Modal title='Детали ингредиента' onClose={handleClose}>
					{infoAboutIngredient && (
						<IngredientDetails ingredient={infoAboutIngredient}/>
					)}
				</Modal>
      }
    </div>
  );
};

export default BurgerIngredients;