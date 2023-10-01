import classNames from "classnames"
import PropTypes from "prop-types"
import { useState } from "react"
import Bun from "./bun/bun"
import styles from "./burger-constructor.module.css"
import FillingList from "./filling-list/filling-list"
import PlaceOrder from "./place-order/place-order"

const BurgerConstructor = ({onClick}) => {
	//Test data
	const [bun, setBun] = useState({
		id:"60666c42cc7b410027a1a9b1",
		name:"Краторная булка N-200i",
		type:"bun",
		proteins:80,
		fat:24,
		carbohydrates:53,
		calories:420,
		price:1255,
		image:"https://code.s3.yandex.net/react/code/bun-02.png",
		image_mobile:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
		image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
		__v:0
	});
	const [fillings, setFillings] = useState([{
		_id:"60666c42cc7b410027a1a9b5",
		 name:"Говяжий метеорит (отбивная)",
		 type:"main",
		 proteins:800,
		 fat:800,
		 carbohydrates:300,
		 calories:2674,
		 price:3000,
		 image:"https://code.s3.yandex.net/react/code/meat-04.png",
		 image_mobile:"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
		 image_large:"https://code.s3.yandex.net/react/code/meat-04-large.png",
		 __v:0
	}]);

	const [cost, setCost] = useState(6010);

	return (
		<div className={classNames(styles.burgerConstructor, "mt-25")}>
			<div className={styles.ingredient_content}>
				{ bun &&
					<Bun
						type={"top"}
						text={`${bun.name} (верх)`}
						price={bun.price}
						image={bun.image}
					/>
				}
				{ fillings &&
					<FillingList fillingList={fillings}/>
				}
				{ bun &&
					<Bun
						type={"bottom"}
						text={`${bun.name} (низ)`}
						price={bun.price}
						image={bun.image}
					/>
				}
			</div>
			<PlaceOrder cost={cost} onClick={onClick}/>
		</div>
	);
};

BurgerConstructor.propTypes = {
	onClick: PropTypes.func.isRequired
};

export default BurgerConstructor;