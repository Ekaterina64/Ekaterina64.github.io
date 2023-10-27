import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import { MAIN } from '../../pages'

export const ProtectedRouteElement = ({ element, allowed = false }) => {
	const location = useLocation()
	const from = location.state?.from || MAIN

	if (!allowed) {
		return <Navigate to={from} state={{ from: location.pathname }} />
	}

	return element
}

ProtectedRouteElement.propTypes = {
	element: PropTypes.element.isRequired,
	allowed: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object,
		PropTypes.bool,
	]),
}

export default ProtectedRouteElement
