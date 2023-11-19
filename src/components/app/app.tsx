import { useEffect } from 'react'
import {
	Location,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from 'react-router-dom'
import {
	FORGOT_PASSWORD,
	ForgotPasswordPage,
	INGREDIENT,
	IngredientPage,
	LOGIN,
	LoginPage,
	MAIN,
	MainPage,
	NotFound404Page,
	PROFILE,
	ProfilePage,
	REGISTER,
	RESET_PASSWORD,
	RegisterPage,
	ResetPasswordPage,
} from '../../pages'
import { useAppDispatch, useAppSelector } from '../../types/hooks'

import { getIngredients } from '../../services/actions/burger-ingredients'
import { getUserData } from '../../services/actions/user'
import { ACCESS_TOKEN } from '../../services/constants'
import { getCookie } from '../../utils/cookies'
import { getForgotPasswordSuccess, getUser } from '../../utils/selectors'
import AppHeader from '../app-header/app-header'
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal'
import {
	ProtectedRouteAuthElement,
	ProtectedRouteElement,
} from '../protected-route'

const App = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const location = useLocation()
	const locationState = location.state as { backgroundLocation: Location }
	const background = locationState && locationState.backgroundLocation

	const forgotPasswordSuccess = useAppSelector(getForgotPasswordSuccess)
	const user = useAppSelector(getUser)
	const access = getCookie(ACCESS_TOKEN)

	useEffect(() => {
		dispatch(getIngredients())
		if (access) {
			dispatch(getUserData())
		}
	}, [dispatch, access])

	const handleClose = () => {
		navigate(MAIN)
	}

	return (
		<>
			<AppHeader />
			<Routes location={background || location}>
				<Route path={MAIN} element={<MainPage />} />
				<Route path={INGREDIENT} element={<IngredientPage />} />
				<Route
					path={LOGIN}
					element={
						<ProtectedRouteElement
							element={<LoginPage />}
							allowed={!user && !access}
						/>
					}
				/>
				<Route
					path={REGISTER}
					element={
						<ProtectedRouteElement
							element={<RegisterPage />}
							allowed={!user && !access}
						/>
					}
				/>
				<Route
					path={FORGOT_PASSWORD}
					element={
						<ProtectedRouteElement
							element={<ForgotPasswordPage />}
							allowed={!user && !access}
						/>
					}
				/>
				<Route
					path={RESET_PASSWORD}
					element={
						<ProtectedRouteElement
							element={<ResetPasswordPage />}
							allowed={!user && !access && forgotPasswordSuccess}
						/>
					}
				/>
				<Route
					path={PROFILE}
					element={
						<ProtectedRouteAuthElement
							element={<ProfilePage />}
							allowed={!!user || !!access}
						/>
					}
				/>
				<Route path='*' element={<NotFound404Page />} />
			</Routes>

			{background && (
				<Routes>
					<Route
						path={INGREDIENT}
						element={
							<Modal title='Детали ингредиента' onClose={handleClose}>
								<IngredientDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
		</>
	)
}

export default App
