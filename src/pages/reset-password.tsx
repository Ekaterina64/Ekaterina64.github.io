import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { FormEvent, useCallback } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { LOGIN } from '.'
import { useForm } from '../hooks/use-form'
import { resetPassword } from '../services/actions/user'
import { TNewPassword } from '../types/data'
import { useAppDispatch, useAppSelector } from '../types/hooks'
import { getResetPasswordSuccess } from '../utils/selectors'
import styles from './pages.module.css'

const ResetPasswordPage = () => {
	const dispatch = useAppDispatch()
	const resetPasswordSuccess = useAppSelector(getResetPasswordSuccess)

	const { values, handleChange } = useForm({
		password: '',
		token: '',
	})

	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault()
			dispatch(resetPassword(values as TNewPassword))
		},
		[dispatch, values]
	)

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
					value={values.password ?? ''}
					onChange={handleChange}
					name='password'
				/>
				<Input
					placeholder='Введите код из письма'
					value={values.token ?? ''}
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
