import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import { LOGIN } from '../../pages'

export const ProtectedRouteAuthElement = ({ element, allowed = false }) => {
	const location = useLocation()

	if (!allowed) {
		return <Navigate to={LOGIN} state={{ from: location.pathname }} />
	}

	return element
}

ProtectedRouteAuthElement.propTypes = {
	element: PropTypes.element.isRequired,
	allowed: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object,
		PropTypes.bool,
	]),
}

export default ProtectedRouteAuthElement
