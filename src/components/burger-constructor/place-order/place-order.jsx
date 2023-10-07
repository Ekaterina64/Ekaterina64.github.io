import {
	Button,
	CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components"
import classNames from "classnames"
import PropTypes from "prop-types"
import { useContext } from "react"
import { TotalPriceContext } from '../../../services/burger-constructor-context.js'
import styles from "../burger-constructor.module.css"

const PlaceOrder = ({onSubmit}) => {
	const { totalPrice } = useContext(TotalPriceContext);
	
	function handleSubmit() {
		onSubmit();
	}
	
	return (
		<div className={classNames(styles.order, "mt-10")}>
			<p className={classNames(styles.totalPrice, "mr-10")}>
				<span className="text text_type_digits-medium mr-2">{totalPrice}</span>
				<CurrencyIcon type="primary" />
			</p>
			<Button
				htmlType="submit"
				type="primary"
				size="large"
				onClick={handleSubmit}
			>
				Оформить заказ
			</Button>
		</div>
	);
};

PlaceOrder.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

export default PlaceOrder;