import classNames from "classnames"
import PropTypes from "prop-types"
import { IngredientPropType } from "../../../utils/prop-types.js"
import styles from "../burger-constructor.module.css"
import FillingItem from "./filling-item/filling_item"

const FillingList = ({fillingList}) => {
	return (
		<ul className={classNames(styles.list, "custom-scroll mt-4 mb-4 pl-4 pr-1")}>
			{fillingList.map(fillingItem => {
				return (
					<FillingItem
						name={fillingItem.name}
						price={fillingItem.price}
						image={fillingItem.image}
						key={fillingItem._id}
					/>
				)
			})}
		</ul>
	);
};

FillingList.propTypes = {
	fillingList: PropTypes.arrayOf(PropTypes.shape(IngredientPropType)).isRequired,
};

export default FillingList;