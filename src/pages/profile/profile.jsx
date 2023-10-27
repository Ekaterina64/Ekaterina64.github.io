import { useEffect, useRef, useState } from 'react'
import { NavLink, useMatch } from 'react-router-dom'

import { logout, updateUser } from '../../services/actions/user'

import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { LOGIN, PROFILE } from '..'
import { getUser } from '../../utils/selectors'
import styles from './profile.module.css'

const ProfilePage = () => {
	const dispatch = useDispatch()
	const userCurrentData = useSelector(getUser)
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		if (userCurrentData) {
			setName(userCurrentData.name)
			setEmail(userCurrentData.email)
			setPassword('')
		}
	}, [userCurrentData])

	const handleLogout = e => {
		e.preventDefault()
		dispatch(logout())
	}
	const matchProfile = useMatch(PROFILE)

	const nameRef = useRef()
	const emailRef = useRef()
	const passwordRef = useRef()

	const handleChangeName = e => {
		const name = e.target.value
		setTimeout(() => nameRef.current?.focus(), 0)
		setName(name)
	}

	const handleChangeEmail = e => {
		const email = e.target.value
		setTimeout(() => emailRef.current?.focus(), 0)
		setEmail(email)
	}

	const handleChangePassword = e => {
		const password = e.target.value
		setTimeout(() => passwordRef.current?.focus(), 0)
		setPassword(password)
	}

	const handleCancel = () => {
		setName(userCurrentData.name)
		setEmail(userCurrentData.email)
		setPassword('')
	}

	const handleSubmit = e => {
		e.preventDefault()
		dispatch(updateUser(name, email, password))
	}
	return (
		<section className={styles.main}>
			<nav className={`${styles.sidebar} mr-15`}>
				<NavLink
					to={PROFILE}
					className={`${styles.link} text text_type_main-medium`}
				>
					{({ isActive }) => (
						<p className={isActive ? styles.active : 'text_color_inactive'}>
							Профиль
						</p>
					)}
				</NavLink>
				<NavLink
					to='/profile/orders'
					className={`${styles.link} text text_type_main-medium`}
				>
					{({ isActive }) => (
						<p className={isActive ? styles.active : 'text_color_inactive'}>
							История заказов
						</p>
					)}
				</NavLink>
				<NavLink
					to={LOGIN}
					className={`${styles.link} text text_type_main-medium text_color_inactive`}
					onClick={handleLogout}
				>
					Выход
				</NavLink>
				<p
					className={`${styles.tip} text text_type_main-default text_color_inactive mt-20`}
				>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</nav>
			<div className={styles.userInfo}>
				{Boolean(matchProfile) && (
					<form className={styles.form} onSubmit={handleSubmit} name='profile'>
						<Input
							type='text'
							name='name'
							placeholder='Имя'
							icon={'EditIcon'}
							value={name}
							ref={nameRef}
							onChange={handleChangeName}
						/>
						<Input
							type='email'
							name='login'
							placeholder='Логин'
							icon={'EditIcon'}
							value={email}
							ref={emailRef}
							onChange={handleChangeEmail}
						/>
						<PasswordInput
							name='password'
							value={password}
							itemRef={passwordRef}
							onChange={handleChangePassword}
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
				)}
			</div>
		</section>
	)
}

export default ProfilePage
