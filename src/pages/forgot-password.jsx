import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import styles from './pages.module.css'

const ForgotPasswordPage = () => {
	const handleChange = () => {}
	const handleClick = () => {}

	return (
		<div className={styles.page}>
			<h2 className={`${styles.title} text text_type_main-medium`}>
				Восстановление пароля
			</h2>
			<form className={styles.form}>
				<EmailInput
					placeholder={'Укажите e-mail'}
					onChange={handleChange}
					value={''}
				/>
				<Button htmlType='button' onClick={handleClick}>
					Восстановить
				</Button>
			</form>
			<p className={`${styles.text} text text_type_main-default`}>
				Вспомнили пароль?{' '}
				<Link to='/login' className={styles.link}>
					Войти
				</Link>
			</p>
		</div>
	)
}

export default ForgotPasswordPage
