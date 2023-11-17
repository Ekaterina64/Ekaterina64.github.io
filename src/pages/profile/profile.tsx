import { useMatch } from 'react-router-dom'

import { PROFILE } from '..'
import ProfileForm from './profile-form'
import ProfileNavigation from './profile-navigation'
import styles from './profile.module.css'

const ProfilePage = () => {
	const matchProfile = useMatch(PROFILE)

	return (
		<section className={styles.main}>
			<ProfileNavigation />
			<div className={styles.userInfo}>
				{Boolean(matchProfile) && <ProfileForm />}
			</div>
		</section>
	)
}

export default ProfilePage
