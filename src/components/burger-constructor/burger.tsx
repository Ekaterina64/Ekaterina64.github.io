import Bun from './bun'
import styles from './burger-constructor.module.css'
import FillingList from './filling-list'

const Burger = () => {
	return (
		<div className={styles.ingredient_content}>
			<Bun type={'top'} />
			<FillingList />
			<Bun type={'bottom'} />
		</div>
	)
}

export default Burger
