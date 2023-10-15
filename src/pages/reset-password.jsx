import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import styles from './pages.module.css'

const ResetPasswordPage = () => {
	const handleChange = () => {}
	const handleClick = () => {}

	return (
		<div className={styles.page}>
			<h2 className={`${styles.title} text text_type_main-medium`}>
				Восстановление пароля
			</h2>
			<form className={styles.form}>
				<PasswordInput
					placeholder='Введите новый пароль'
					value={''}
					onChange={handleChange}
				/>
				<Input
					placeholder='Введите код из письма'
					value={''}
					onChange={handleChange}
				/>
				<Button htmlType='button' onClick={handleClick}>
					Сохранить
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

export default ResetPasswordPage
