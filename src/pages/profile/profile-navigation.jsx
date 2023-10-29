import { NavLink } from 'react-router-dom'

import { logout } from '../../services/actions/user'

import { useDispatch } from 'react-redux'
import { LOGIN, PROFILE } from '..'
import styles from './profile.module.css'

const ProfileNavigation = () => {
	const dispatch = useDispatch()

	const handleLogout = e => {
		e.preventDefault()
		dispatch(logout())
	}

	return (
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
	)
}

export default ProfileNavigation
