import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types"
import { useState } from "react"
import { Types } from '../../../utils/ingredient-types'

const TabContainer = ({types}) => {

	const [current, setCurrent] = useState(types.BUN);
  
	const onTabClick = (value) => {
		setCurrent(value);
		const element = document.getElementById(value);
    if (element) element.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="mb-10" style={{ display: "flex" }}>
			<Tab
				value={types.BUN}
				active={current === types.BUN}
				onClick={onTabClick}
			>
				Булки
			</Tab>
			<Tab
				value={types.SOUSE}
				active={current === types.SOUSE}
				onClick={onTabClick}
			>
				Соусы
			</Tab>
			<Tab
				value={types.MAIN}
				active={current === types.MAIN}
				onClick={onTabClick}
			>
				Начинки
			</Tab>
		</div>
	);
};

TabContainer.propTypes = {
	types: PropTypes.instanceOf(Types).isRequired
};

export default TabContainer;