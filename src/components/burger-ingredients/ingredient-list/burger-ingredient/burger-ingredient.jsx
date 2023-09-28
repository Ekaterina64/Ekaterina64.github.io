import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import classNames from "classnames"
import PropTypes from "prop-types"
import { useCallback } from "react"
import styles from "../../burger-ingredients.module.css"

const BurgerIngredient = ({item, count, onClick}) => {

	const handleClick = useCallback(() => {
		onClick(item);
	}, [item, onClick] );
	
	return (
		<li className={styles.item}>
			<div
				onClick={handleClick}
			>
				{count > 0 && <Counter count={count} size='default'/>}
				<img className='ml-4 mr-4' src={item.image} alt="Ингредиент"/>
				<div className={classNames('mt-2 mb-2', styles.price)}>
					<p className="text text_type_digits-default mr-2">{item.price}</p>
					<CurrencyIcon/>
				</div>
				<p className={classNames("text text_type_main-default", styles.ingredientName)}>{item.name}</p>
			</div>
		</li>
	);
};

BurgerIngredient.propTypes = {
	item: PropTypes.object.isRequired,
	count: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired
};

export default BurgerIngredient;