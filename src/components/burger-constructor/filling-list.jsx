import classNames from "classnames"
import { useSelector } from 'react-redux'
import styles from "./burger-constructor.module.css"
import FillingItem from "./filling-item.jsx"

const FillingList = () => {

	const { fillings } = useSelector(state=>state.burgerConstructor.burger);
	return (
		<ul className={classNames(styles.list, "custom-scroll mt-4 mb-4 pl-4 pr-1")}>
			{fillings.map(fillingItem => {
				return (
					<FillingItem
						name={fillingItem.name}
						price={fillingItem.price}
						image={fillingItem.image}
						key={fillingItem.id}
						id={fillingItem.id}
					/>
				)
			})}
		</ul>
	);
};

export default FillingList;