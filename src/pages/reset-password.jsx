import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { LOGIN } from '.'
import { resetPassword } from '../services/actions/user'
import { getResetPasswordSuccess } from '../utils/selectors'
import styles from './pages.module.css'

const ResetPasswordPage = () => {
	const dispatch = useDispatch()
	const resetPasswordSuccess = useSelector(getResetPasswordSuccess)

	const [newPassword, setNewPassword] = useState({
		password: '',
		token: '',
	})

	const handleSubmit = useCallback(
		e => {
			e.preventDefault()
			dispatch(resetPassword(newPassword))
		},
		[dispatch, newPassword]
	)

	const handleChange = e => {
		setNewPassword({ ...newPassword, [e.target.name]: e.target.value })
	}

	if (resetPasswordSuccess) {
		return <Navigate to={LOGIN} />
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
				<Link to={LOGIN} className={styles.link}>
					Войти
				</Link>
			</p>
		</div>
	)
}

export default ResetPasswordPage
