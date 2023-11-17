import { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './app-header.module.css'

type THeaderLinkProps = {
	icon: ReactNode
	name: string
	link: string
	extraClass?: string
}

const HeaderLink: FC<Readonly<THeaderLinkProps>> = ({
	icon,
	name,
	link,
	extraClass,
}) => {
	return (
		<NavLink className={`${styles.link} ${extraClass}`} to={link}>
			{({ isActive }) => (
				<>
					{icon}
					<p
						className={`${
							isActive ? styles.active : ''
						} text text_type_main-default ml-2`}
					>
						{name}
					</p>
				</>
			)}
		</NavLink>
	)
}

export default HeaderLink
