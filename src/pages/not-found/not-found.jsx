import { Link } from 'react-router-dom'

import styles from './not-found.module.css'

const NotFound404Page = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<h1 className='text text_type_main-medium'>Oops! 404 Error</h1>
				<p className='text text_type_main-medium'>
					The page you requested does not exist
				</p>
				<br />
				<br />
				<p className='text text_type_main-medium'>
					Check the address or try{' '}
					<Link to='/' className={styles.link}>
						Constructor
					</Link>
				</p>
			</div>
		</div>
	)
}

export default NotFound404Page
