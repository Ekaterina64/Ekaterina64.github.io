import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { FormEvent, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FORGOT_PASSWORD, MAIN, REGISTER } from '.'
import { useForm } from '../hooks/use-form'
import { login } from '../services/actions/user'
import { TLoginUser } from '../types/data'
import { useAppDispatch } from '../types/hooks'
import styles from './pages.module.css'

const LoginPage = () => {
	const dispatch = useAppDispatch()
	const { values, handleChange } = useForm({ email: '', password: '' })
	const location = useLocation()
	const locationState = location.state as { from: Location }
	const from = (locationState && locationState.from) || MAIN
	const navigate = useNavigate()

	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault()
			dispatch(login(values as TLoginUser))
			navigate(from, { replace: true, state: { from: location.pathname } })
		},
		[dispatch, values]
	)

	return (
		<div className={styles.page}>
			<h2 className={`${styles.title} text text_type_main-medium`}>Вход</h2>
			<form className={styles.form} name='login' onSubmit={handleSubmit}>
				<EmailInput
					value={values.email ?? ''}
					onChange={handleChange}
					name='email'
					autoComplete='on'
				/>
				<PasswordInput
					value={values.password ?? ''}
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
