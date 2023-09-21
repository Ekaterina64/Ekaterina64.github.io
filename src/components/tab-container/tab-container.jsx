import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState } from "react"

const TabContainer = () => {

	const Type = {
		BUN: "BUN",
		SAUCE: "SAUCE",
		MAIN: "MAIN",
	};

	const [current, setCurrent] = useState(Type.BUN);
  const onTabClick = (value) => setCurrent(value);

	return (
		<div className="mb-10" style={{ display: "flex" }}>
			<Tab
				value={Type.BUN}
				active={current === Type.BUN}
				onClick={onTabClick}
			>
				Булки
			</Tab>
			<Tab
				value={Type.SAUCE}
				active={current === Type.SAUCE}
				onClick={onTabClick}
			>
				Соусы
			</Tab>
			<Tab
				value={Type.MAIN}
				active={current === Type.MAIN}
				onClick={onTabClick}
			>
				Начинки
			</Tab>
		</div>
	);
};

export default TabContainer;