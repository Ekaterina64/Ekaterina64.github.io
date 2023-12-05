import { useMatch } from 'react-router-dom'

import { FC, ReactNode, useEffect } from 'react'
import { PROFILE, PROFILE_ORDERS } from '..'
import {
	connect as orderWsConnect,
	disconnect as orderWsDisconnect,
} from '../../services/actions/orderWs'
import { ACCESS_TOKEN, NORMA_WSS } from '../../services/constants'
import { useAppDispatch } from '../../types/hooks'
import { getCookie } from '../../utils/cookies'
import ProfileForm from './profile-form'
import ProfileNavigation from './profile-navigation'
import styles from './profile.module.css'

type TProfileProps = {
	children?: ReactNode
}

const ProfilePage: FC<TProfileProps> = props => {
	const matchProfile = useMatch(PROFILE)
	const matchOrders = useMatch(PROFILE_ORDERS)

	const dispatch = useAppDispatch()
	const token = getCookie(ACCESS_TOKEN)

	useEffect(() => {
		if (matchOrders) {
			dispatch(orderWsConnect(`${NORMA_WSS}?token=${token}`))
		}
		return () => {
			matchOrders && dispatch(orderWsDisconnect(1000))
		}
	}, [dispatch, matchOrders, token])

	return (
		<section className={styles.main}>
			<ProfileNavigation />
			<div className={styles.userInfo}>
				{Boolean(matchProfile) && <ProfileForm />}
				{Boolean(matchOrders) && props.children}
			</div>
		</section>
	)
}

export default ProfilePage
