import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { LOGIN, MAIN } from '.'
import { useForm } from '../hooks/use-form'
import { register } from '../services/actions/user'
import { getIsAuthenticated } from '../services/selectors'
import { TRegisterUser } from '../types/data'
import { useAppDispatch, useAppSelector } from '../types/hooks'
import styles from './pages.module.css'

const RegisterPage = () => {
	const { values, handleChange } = useForm({
		name: '',
		email: '',
		password: '',
	})
	const dispatch = useAppDispatch()
	const isAuthenticated = useAppSelector(getIsAuthenticated)

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(register(values as TRegisterUser))
	}

	if (isAuthenticated) {
		return <Navigate to={MAIN} />
	}
	return (
		<div className={styles.page}>
			<h2 className={`${styles.title} text text_type_main-medium`}>
				Регистрация
			</h2>
			<form onSubmit={handleSubmit} name='register' className={styles.form}>
				<Input
					placeholder='Имя'
					value={values.name ?? ''}
					name='name'
					onChange={handleChange}
				/>
				<EmailInput
					value={values.email ?? ''}
					name='email'
					onChange={handleChange}
				/>
				<PasswordInput
					value={values.password ?? ''}
					name='password'
					onChange={handleChange}
				/>
				<Button htmlType='submit'>Зарегистрироваться</Button>
			</form>
			<p className={`${styles.text} text text_type_main-default`}>
				Уже зарегистрированы?{' '}
				<Link to={LOGIN} className={styles.link}>
					Войти
				</Link>
			</p>
		</div>
	)
}

export default RegisterPage
