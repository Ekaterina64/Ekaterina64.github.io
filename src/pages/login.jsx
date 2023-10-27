import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FORGOT_PASSWORD, MAIN, REGISTER } from '.'
import { login } from '../services/actions/user'
import styles from './pages.module.css'

const LoginPage = () => {
	const dispatch = useDispatch()
	const [user, setUser] = useState({ email: '', password: '' })
	const location = useLocation()
	const from = location.state?.from || MAIN
	const navigate = useNavigate()

	const handleChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}
	const handleSubmit = useCallback(
		e => {
			e.preventDefault()
			dispatch(login(user))
			navigate(from, { replace: true, state: { from: location.pathname } })
		},
		[dispatch, user]
	)

	return (
		<div className={styles.page}>
			<h2 className={`${styles.title} text text_type_main-medium`}>Вход</h2>
			<form className={styles.form} name='login' onSubmit={handleSubmit}>
				<EmailInput
					value={user.email}
					onChange={handleChange}
					name='email'
					autoComplete='on'
				/>
				<PasswordInput
					value={user.password}
					onChange={handleChange}
					name='password'
				/>
				<Button htmlType='submit'>Войти</Button>
			</form>
			<p className={`${styles.text} text text_type_main-default pb-4`}>
				Вы новый пользователь?{' '}
				<Link to={REGISTER} className={styles.link}>
					Зарегистрироваться
				</Link>
			</p>
			<p className={`${styles.text} text text_type_main-default`}>
				Забыли пароль?{' '}
				<Link to={FORGOT_PASSWORD} className={styles.link}>
					Восстановить пароль
				</Link>
			</p>
		</div>
	)
}

export default LoginPage
