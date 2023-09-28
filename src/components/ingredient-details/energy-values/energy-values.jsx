import classNames from "classnames"
import PropTypes from "prop-types"
import styles from "../../modal/modal.module.css"

const EnergyValues = (props) => {
  const energyTextStyle = "text text_type_main-default text_color_inactive";
  return (
    <ul className={styles.energyValues}>
      <li className={classNames(styles.energyValue, styles.energyValue_calories)}>
        <p className={classNames(energyTextStyle, "mb-2", styles.energy )}>
          Калории, ккал
        </p>
        <p className={classNames(energyTextStyle, styles.energy)}>
          {props.calories}
        </p>
      </li>
      <li className={styles.energyValue}>
        <p className={classNames(energyTextStyle, "mb-2", styles.energy)}>
          Белки, г
        </p>
        <p className={classNames(energyTextStyle, styles.energy)}>
          {props.proteins}
        </p>
      </li>
      <li className={styles.energyValue}>
        <p className={classNames(energyTextStyle, "mb-2", styles.energy)}>
          Жиры, г
        </p>
        <p className={classNames(energyTextStyle, styles.energy)}>
          {props.fat}
        </p>
      </li>
      <li className={styles.energyValue}>
        <p className={classNames(energyTextStyle, "mb-2", styles.energy)}>
          Углеводы, г
        </p>
        <p className={classNames(energyTextStyle, styles.energy)}>
          {props.carbohydrates}
        </p>
      </li>
    </ul>
  );
};

EnergyValues.propTypes = {
	calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired
};

export default EnergyValues;