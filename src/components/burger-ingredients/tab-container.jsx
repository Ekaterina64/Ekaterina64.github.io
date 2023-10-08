import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import classNames from "classnames"
import PropTypes from "prop-types"
import { Types } from "../../utils/ingredient-types.js"
import styles from "./burger-ingredients.module.css"

const TabContainer = ({current, onClick}) => {

	return (
		<div className={classNames(styles.tabContainer, "mb-10")}>
			<Tab
				value={Types.BUN}
				active={current === Types.BUN}
				onClick={onClick}
			>
				Булки
			</Tab>
			<Tab
				value={Types.SOUSE}
				active={current === Types.SOUSE}
				onClick={onClick}
			>
				Соусы
			</Tab>
			<Tab
				value={Types.MAIN}
				active={current === Types.MAIN}
				onClick={onClick}
			>
				Начинки
			</Tab>
		</div>
	);
};

TabContainer.propTypes = {
	current: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default TabContainer;