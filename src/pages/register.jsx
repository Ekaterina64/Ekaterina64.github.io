import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services/actions/user'
import styles from './pages.module.css'

const RegisterPage = () => {
	const [user, setUser] = useState({ name: '', email: '', password: '' })
	const dispatch = useDispatch()
	const isAuthenticated = useSelector(state => state.user.isAuthenticated)
	const navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault()
		dispatch(register(user))
	}
	const handleChange = e => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		})
	}

	if (isAuthenticated) {
		return navigate('/', { replace: true })
	}
	return (
		<div className={styles.page}>
			<h2 className={`${styles.title} text text_type_main-medium`}>
				Регистрация
			</h2>
			<form onSubmit={handleSubmit} name='register' className={styles.form}>
				<Input
					placeholder='Имя'
					value={user.name}
					name='name'
					onChange={handleChange}
				/>
				<EmailInput value={user.email} name='email' onChange={handleChange} />
				<PasswordInput
					value={user.password}
					name='password'
					onChange={handleChange}
				/>
				<Button htmlType='submit'>Зарегистрироваться</Button>
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
