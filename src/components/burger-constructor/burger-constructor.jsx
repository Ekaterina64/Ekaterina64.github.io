import classNames from "classnames"

import Bun from "./bun/bun"
import styles from "./burger-constructor.module.css"
import FillingList from "./filling-list/filling-list"
import PlaceOrder from "./place-order/place-order"

const BurgerConstructor = () => {
	return (
		<div className={classNames(styles.root, "mt-25")}>
			<div className={styles.ingredient_content}>
				<Bun
					type={"top"}
					text={"Краторная булка N-200i (верх)"}
					price={20}
					image={"https://code.s3.yandex.net/react/code/bun-02.png"}
				/>
				<FillingList/>
				<Bun
					type={"bottom"}
					text={"Краторная булка N-200i (низ)"}
					price={20}
					image={"https://code.s3.yandex.net/react/code/bun-02.png"}
				/>
			</div>
			<PlaceOrder/>
		</div>
	);
};

export default BurgerConstructor;