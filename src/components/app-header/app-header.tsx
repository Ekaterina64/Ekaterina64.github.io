import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { FEED, MAIN, PROFILE } from '../../pages'
import { getUser } from '../../services/selectors'
import styles from './app-header.module.css'
import HeaderLink from './header-link'

const AppHeader = () => {
	const user = useSelector(getUser)
	const location = useLocation()

	const iconType = (path: string) =>
		(location.pathname.startsWith(path) && path !== MAIN) ||
		location.pathname === path
			? 'primary'
			: 'secondary'

	return (
		<header className={styles.header}>
			<div className={styles.inner_header}>
				<HeaderLink
					name='Конструктор'
					link={MAIN}
					icon={<BurgerIcon type={iconType(MAIN)} />}
				/>
				<HeaderLink
					name='Лента заказов'
					link={FEED}
					icon={<ListIcon type={iconType(FEED)} />}
				/>
				<Link to={MAIN} className={styles.logo}>
					<Logo />
				</Link>
				<HeaderLink
					name={user ? user.name : 'Личный кабинет'}
					link={PROFILE}
					icon={<ProfileIcon type={iconType(PROFILE)} />}
					extraClass={styles.link_right}
				/>
			</div>
		</header>
	)
}

export default AppHeader
