import { useSelector } from 'react-redux'
import { useFilter } from '../../hooks/use-filter'
import { useTabs } from '../../hooks/use-tab'
import { getBurgerIngredients } from '../../services/selectors'
import { Loader } from '../../ui/loader/loader'
import { Types } from '../../utils/ingredient-types'
import styles from './burger-ingredients.module.css'
import IngredientList from './ingredient-list'
import TabContainer from './tab-container'

const BurgerIngredients = () => {
	const { ingredients, ingredientsRequest, ingredientsFailed } =
		useSelector(getBurgerIngredients)

	const { currentTab, bunsRef, sousesRef, mainRef, onTabClick } = useTabs()

	const [dataBun, dataMain, dataSouse] = useFilter(ingredients)

	if (ingredientsRequest) {
		return <Loader size='large' />
	} else if (ingredientsFailed) {
		return <p>Что-то пошло не так... Попробуйте перезагрузить</p>
	}

	return (
		<div className={styles.section}>
			<h1 className={'text text_type_main-large mb-5 mt-10'}>
				Соберите бургер
			</h1>
			<TabContainer current={currentTab} onClick={onTabClick} />
			<div className={`${styles.ingredientsContainer} custom-scroll`}>
				<h2
					ref={bunsRef}
					id={Types.BUN}
					className='text text_type_main-medium mb-6'
				>
					Булки
				</h2>
				<IngredientList ingredients={dataBun} />
				<h2
					ref={sousesRef}
					id={Types.SOUSE}
					className='text text_type_main-medium mb-6 mt-10'
				>
					Соусы
				</h2>
				<IngredientList ingredients={dataSouse} />
				<h2
					ref={mainRef}
					id={Types.MAIN}
					className='text text_type_main-medium mb-6 mt-10'
				>
					Начинки
				</h2>
				<IngredientList ingredients={dataMain} />
			</div>
		</div>
	)
}

export default BurgerIngredients
