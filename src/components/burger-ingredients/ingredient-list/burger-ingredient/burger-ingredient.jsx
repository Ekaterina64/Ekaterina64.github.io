import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import classNames from "classnames"
import PropTypes from "prop-types"
import styles from "../../burger-ingredients.module.css"

const BurgerIngredient = ({name, price, image, count}) => {
	return (
		<li className={styles.item}>
			<div>
				{count > 0 && <Counter count={count} size='default'/>}
				<img className='ml-4 mr-4' src={image} alt="Ингредиент"/>
				<div className={classNames('mt-2 mb-2', styles.price)}>
					<p className="text text_type_digits-default mr-2">{price}</p>
					<CurrencyIcon/>
				</div>
				<p className={classNames("text text_type_main-default", styles.ingredientName)}>{name}</p>
			</div>
		</li>
	);
};

BurgerIngredient.propTypes = {
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	count: PropTypes.number.isRequired
};

export default BurgerIngredient;