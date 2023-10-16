import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { resetPassword } from '../services/actions/user'
import styles from './pages.module.css'

const ResetPasswordPage = () => {
	const dispatch = useDispatch()

	const handleSubmit = e => {
		e.preventDefault()
		dispatch(resetPassword(newPassword))
	}

	const [newPassword, setNewPassword] = useState({
		password: '',
		token: '',
	})

	const handleChange = e => {
		setNewPassword({ ...newPassword, [e.target.name]: e.target.value })
	}

	return (
		<div className={styles.page}>
			<h2 className={`${styles.title} text text_type_main-medium`}>
				Восстановление пароля
			</h2>
			<form onSubmit={handleSubmit} className={styles.form}>
				<PasswordInput
					placeholder='Введите новый пароль'
					value={newPassword.password}
					onChange={handleChange}
					name='password'
				/>
				<Input
					placeholder='Введите код из письма'
					value={newPassword.token}
					onChange={handleChange}
					name='token'
				/>
				<Button htmlType='submit'>Сохранить</Button>
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
