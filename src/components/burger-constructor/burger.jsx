import Bun from "./bun.jsx"
import styles from "./burger-constructor.module.css"
import FillingList from "./filling-list.jsx"

const Burger = () => {

	return (
		<div className={styles.ingredient_content}>
			<Bun type={"top"}/>
			<FillingList/>
			<Bun type={"bottom"}/>
		</div>
	);
};

export default Burger;