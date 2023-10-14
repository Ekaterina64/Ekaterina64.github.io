import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'
import styles from './app-header.module.css'

const AppHeader = () => {
	return (
		<header className={styles.header}>
			<div className={styles.inner_header}>
				<a className={classNames(styles.link, styles.link_active)} href='/'>
					<BurgerIcon type='primary' />
					<p className='text text_type_main-default ml-2'>Конструктор</p>
				</a>
				<a className={classNames(styles.link, 'ml-2')} href='/'>
					<ListIcon type='secondary' />
					<p className='text text_type_main-default text_color_inactive ml-2'>
						Лента заказов
					</p>
				</a>
				<a className={styles.logo} href='/'>
					<Logo />
				</a>
				<a className={classNames(styles.link, styles.link_right)} href='/'>
					<ProfileIcon type='secondary' />
					<p className='text text_type_main-default text_color_inactive ml-2'>
						Личный кабинет
					</p>
				</a>
			</div>
		</header>
	)
}

export default AppHeader
