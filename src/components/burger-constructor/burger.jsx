import { useSelector } from 'react-redux'
import Bun from "./bun.jsx"
import styles from "./burger-constructor.module.css"
import FillingList from "./filling-list.jsx"

const Burger = () => {

	const { bun, fillings } = useSelector(state=>state.burgerConstructor);

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

export default Burger;