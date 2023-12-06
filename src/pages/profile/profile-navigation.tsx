import { NavLink, useLocation } from 'react-router-dom'

import { logout } from '../../services/actions/user'

import { SyntheticEvent } from 'react'
import { LOGIN, PROFILE, PROFILE_ORDERS } from '..'
import { useAppDispatch } from '../../types/hooks'
import styles from './profile.module.css'

const ProfileNavigation = () => {
	const dispatch = useAppDispatch()

	const handleLogout = (e: SyntheticEvent) => {
		e.preventDefault()
		dispatch(logout())
	}

	const location = useLocation()
	const type = (path: string) =>
		path === location.pathname ? styles.active : 'text_color_inactive'

	return (
		<nav className={`${styles.sidebar} mr-15`}>
			<NavLink
				to={PROFILE}
				className={`${styles.link} text text_type_main-medium`}
			>
				<p className={type(PROFILE)}>Профиль</p>
			</NavLink>
			<NavLink
				to={PROFILE_ORDERS}
				className={`${styles.link} text text_type_main-medium`}
			>
				<p className={type(PROFILE_ORDERS)}>История заказов</p>
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
	)
}

export default ProfileNavigation
