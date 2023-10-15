import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom'
import styles from './pages.module.css'

const LoginPage = () => {
	const navigate = useNavigate()

	const handleClick = () => {
		navigate('/')
	}
	const handleChange = () => {}
	return (
		<div className={styles.page}>
			<h2 className={`${styles.title} text text_type_main-medium`}>Вход</h2>
			<form className={styles.form}>
				<EmailInput value={''} onChange={handleChange} />
				<PasswordInput value={''} onChange={handleChange} />
				<Button htmlType='button' onClick={handleClick}>
					Войти
				</Button>
			</form>
			<p className={`${styles.text} text text_type_main-default pb-4`}>
				Вы новый пользователь?{' '}
				<Link to='/register' className={styles.link}>
					Зарегистрироваться
				</Link>
			</p>
			<p className={`${styles.text} text text_type_main-default`}>
				Забыли пароль?{' '}
				<Link to='/forgot-password' className={styles.link}>
					Восстановить пароль
				</Link>
			</p>
		</div>
	)
}

export default LoginPage
