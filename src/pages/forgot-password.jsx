import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { forgotPassword } from '../services/actions/user'
import styles from './pages.module.css'

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState('')
	const mayResetPassword = useSelector(state => state.user.mayResetPassword)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleChange = e => {
		setEmail(e.target.value)
	}
	const handleSubmit = e => {
		e.preventDefault()
		dispatch(forgotPassword(email))
	}

	if (mayResetPassword) {
		navigate('/reset-password')
	}
	return (
		<div className={styles.page}>
			<h2 className={`${styles.title} text text_type_main-medium`}>
				Восстановление пароля
			</h2>
			<form
				onSubmit={handleSubmit}
				name='forgot-password'
				className={styles.form}
			>
				<EmailInput
					placeholder={'Укажите e-mail'}
					onChange={handleChange}
					value={email}
					name='email'
				/>
				<Button htmlType='submit'>Восстановить</Button>
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
