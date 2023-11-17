import { FC, ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { MAIN } from '../../pages'

type TProtectedRouteProps = {
	element: ReactElement
	allowed: boolean | string | Object //object change
}

export const ProtectedRouteElement: FC<TProtectedRouteProps> = ({
	element,
	allowed = false,
}) => {
	const location = useLocation()
	const locationState = location.state as { from: Location }
	const from = (locationState && locationState.from) || MAIN

	if (!allowed) {
		return <Navigate to={from} state={{ from: location.pathname }} />
	}

	return element
}

export default ProtectedRouteElement
