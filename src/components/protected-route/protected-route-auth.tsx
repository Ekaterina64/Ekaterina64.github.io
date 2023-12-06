import { FC, ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { LOGIN } from '../../pages'

type TProtectedRouteAuthElement = {
	element: ReactElement
	allowed: boolean
}
export const ProtectedRouteAuthElement: FC<TProtectedRouteAuthElement> = ({
	element,
	allowed = false,
}) => {
	const location = useLocation()

	if (!allowed) {
		return <Navigate to={LOGIN} state={{ from: location.pathname }} />
	}

	return element
}

export default ProtectedRouteAuthElement
