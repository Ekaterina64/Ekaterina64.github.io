import classNames from "classnames"
import { useSelector } from 'react-redux'
import styles from "./burger-constructor.module.css"
import Burger from './burger.jsx'
import PlaceOrder from "./place-order"

const BurgerConstructor = () => {

	const burger = useSelector(state => state.burgerConstructor.burger);
	
	return (
		<div className={classNames(styles.burgerConstructor, "mt-25")}>
			{ ( burger.bun || burger.fillings.length ) ?
				<>
					<Burger/>
					<PlaceOrder/>
				</>
				:
				<p className="text text_type_main-large">
					Перетащите ингредиенты для составления бургера
				</p>
			}
		</div>
	);
};

export default BurgerConstructor;