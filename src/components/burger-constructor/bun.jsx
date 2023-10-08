import {
	ConstructorElement
} from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types"
import styles from "./burger-constructor.module.css"

const Bun = (props) => {
	return (
		<div className={styles.bun}>
			<ConstructorElement
				type={props.type}
				isLocked={true}
				text={props.text}
				price={props.price}
				thumbnail={props.image}
			/>
		</div>
	);
};

Bun.propTypes = {
	type: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
};

export default Bun;