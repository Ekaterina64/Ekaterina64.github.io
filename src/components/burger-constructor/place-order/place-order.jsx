import {
	Button,
	CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components"
import classNames from "classnames"
import PropTypes from "prop-types"
import styles from "../burger-constructor.module.css"

const PlaceOrder = ({cost, onClick}) => {

	function handleClick() {
		onClick();
	}
	
	return (
		<div className={classNames(styles.order, "mt-10")}>
			<p className={classNames(styles.totalCost, "mr-10")}>
				<span className="text text_type_digits-medium mr-2">{cost}</span>
				<CurrencyIcon type="primary" />
			</p>
			<div onClick={handleClick}>
				<Button htmlType="button" type="primary" size="large">
					Оформить заказ
				</Button>
			</div>
		</div>
	);
};

PlaceOrder.propTypes = {
	cost: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired
};

export default PlaceOrder;