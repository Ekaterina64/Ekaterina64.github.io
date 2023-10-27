import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import styles from './app-header.module.css'

const HeaderLink = ({ icon, name, link, extraClass }) => {
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

HeaderLink.propTypes = {
	icon: PropTypes.element.isRequired,
	name: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	extraClass: PropTypes.string,
}

export default HeaderLink
