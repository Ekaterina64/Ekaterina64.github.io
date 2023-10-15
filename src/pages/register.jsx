import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import styles from './pages.module.css'

const RegisterPage = () => {
	const handleClick = () => {}
	const handleChange = () => {}
	return (
		<div className={styles.page}>
			<h2 className={`${styles.title} text text_type_main-medium`}>
				Регистрация
			</h2>
			<form className={styles.form}>
				<Input placeholder='Имя' value={''} onChange={handleChange} />
				<EmailInput value={''} onChange={handleChange} />
				<PasswordInput value={''} onChange={handleChange} />
				<Button htmlType='button' onClick={handleClick}>
					Зарегистрироваться
				</Button>
			</form>
			<p className={`${styles.text} text text_type_main-default`}>
				Уже зарегистрированы?{' '}
				<Link to='/login' className={styles.link}>
					Войти
				</Link>
			</p>
		</div>
	)
}

export default RegisterPage
