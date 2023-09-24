import {
	Button,
	CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components"
import classNames from "classnames"

import styles from "../burger-constructor.module.css"

const PlaceOrder = () => {
	return (
		<div className={classNames(styles.order, "mt-10")}>
			<p className={classNames(styles.totalCost, "mr-10")}>
				<span className="text text_type_digits-medium mr-2">125</span>
				<CurrencyIcon type="primary" />
			</p>
			<Button htmlType="button" type="primary" size="large">
				Оформить заказ
			</Button>
		</div>
	);
};

export default PlaceOrder;