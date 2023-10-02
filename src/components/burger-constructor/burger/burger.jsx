import PropTypes from "prop-types"
import { useContext, useEffect } from "react"
import { TotalPriceContext } from '../../../services/burger-constructor-context.js'
import { IngredientPropType } from '../../../utils/prop-types.js'
import styles from "../burger-constructor.module.css"
import Bun from "./bun/bun.jsx"
import FillingList from "./filling-list/filling-list.jsx"

const Burger = ({bun, fillings}) => {
	const { setTotalPrice } = useContext(TotalPriceContext);
	
	//before dnd realization
	useEffect(
		() => {
			let total = bun ? bun.price * 2: 0;
			fillings.map(item => (total += item.price));
			setTotalPrice(total);
		},
		[bun, fillings, setTotalPrice]
  );

	return (
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
	);
};

Burger.propTypes = {
	fillings: PropTypes.arrayOf(PropTypes.shape(IngredientPropType)).isRequired,
	bun: PropTypes.shape(IngredientPropType).isRequired
};

export default Burger;