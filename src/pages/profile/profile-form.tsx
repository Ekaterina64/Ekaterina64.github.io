import { FormEvent, useEffect } from 'react'

import { updateUser } from '../../services/actions/user'

import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useForm } from '../../hooks/use-form'
import { getUser } from '../../services/selectors'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import styles from './profile.module.css'

const ProfileForm = () => {
	const dispatch = useAppDispatch()
	const userCurrentData = useAppSelector(getUser)
	const { values, handleChange, setValues } = useForm({
		name: '',
		email: '',
		password: '',
	})

	useEffect(() => {
		if (userCurrentData) {
			setValues({
				...values,
				email: userCurrentData.email,
				name: userCurrentData.name,
				password: '',
			})
		}
	}, [userCurrentData])

	const handleCancel = () => {
		setValues({
			...values,
			email: userCurrentData?.email,
			name: userCurrentData?.name,
			password: '',
		})
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(
			updateUser(
				values.name as string,
				values.email as string,
				values.password as string
			)
		)
	}
	return (
		<form className={styles.form} onSubmit={handleSubmit} name='profile'>
			<Input
				type='text'
				name='name'
				placeholder='Имя'
				icon={'EditIcon'}
				value={values.name ?? ''}
				onChange={handleChange}
			/>
			<Input
				type='email'
				name='login'
				placeholder='Логин'
				icon={'EditIcon'}
				value={values.email ?? ''}
				onChange={handleChange}
			/>
			<PasswordInput
				name='password'
				value={values.password ?? ''}
				onChange={handleChange}
			/>
			<div className={styles.buttons}>
				<Button
					type='primary'
					size='medium'
					htmlType='button'
					onClick={handleCancel}
				>
					Отмена
				</Button>
				<Button type='primary' size='medium' htmlType='submit'>
					Сохранить
				</Button>
			</div>
		</form>
	)
}

export default ProfileForm
