import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { FormEvent, useCallback } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { LOGIN, RESET_PASSWORD } from '.'
import { useForm } from '../hooks/use-form'
import { forgotPassword } from '../services/actions/user'
import { useAppDispatch, useAppSelector } from '../types/hooks'
import { getForgotPasswordSuccess } from '../utils/selectors'
import styles from './pages.module.css'

const ForgotPasswordPage = () => {
	const { values, handleChange } = useForm({ email: '' })
	const dispatch = useAppDispatch()
	const forgotPasswordSuccess = useAppSelector(getForgotPasswordSuccess)

	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault()
			dispatch(forgotPassword(values.email as string))
		},
		[dispatch, values.email]
	)

	if (forgotPasswordSuccess) {
		return <Navigate to={RESET_PASSWORD} />
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
					value={values.email ?? ''}
					name='email'
					autoComplete='on'
				/>
				<Button htmlType='submit'>Восстановить</Button>
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

export default ForgotPasswordPage
