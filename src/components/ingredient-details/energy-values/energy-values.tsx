import { FC } from 'react'
import styles from '../ingredient-details.module.css'

type TEnergyValuesProps = {
	calories: number
	proteins: number
	fat: number
	carbohydrates: number
}

const EnergyValues: FC<Readonly<TEnergyValuesProps>> = props => {
	const energyTextStyle = 'text text_type_main-default text_color_inactive'
	return (
		<ul className={styles.energyValues}>
			<li className={styles.energyValue_calories}>
				<p className={`${energyTextStyle} mb-2 ${styles.energy}`}>
					Калории, ккал
				</p>
				<p className={`${energyTextStyle} ${styles.energy}`}>
					{props.calories}
				</p>
			</li>
			<li className={styles.energyValue}>
				<p className={`${energyTextStyle} mb-2 ${styles.energy}`}>Белки, г</p>
				<p className={`${energyTextStyle} ${styles.energy}`}>
					{props.proteins}
				</p>
			</li>
			<li className={styles.energyValue}>
				<p className={`${energyTextStyle} mb-2 ${styles.energy}`}>Жиры, г</p>
				<p className={`${energyTextStyle} ${styles.energy}`}>{props.fat}</p>
			</li>
			<li className={styles.energyValue}>
				<p className={`${energyTextStyle} mb-2 ${styles.energy}`}>
					Углеводы, г
				</p>
				<p className={`${energyTextStyle} ${styles.energy}`}>
					{props.carbohydrates}
				</p>
			</li>
		</ul>
	)
}

export default EnergyValues
