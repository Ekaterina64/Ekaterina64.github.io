import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {
	FEED,
	FEED_INFO,
	FORGOT_PASSWORD,
	ForgotPasswordPage,
	INGREDIENT,
	IngredientPage,
	LOGIN,
	LoginPage,
	MAIN,
	MainPage,
	NotFound404Page,
	ORDERS_INFO,
	PROFILE,
	PROFILE_ORDERS,
	ProfilePage,
	REGISTER,
	RESET_PASSWORD,
	RegisterPage,
	ResetPasswordPage,
} from '../../pages'
import { useAppDispatch, useAppSelector } from '../../types/hooks'

import FeedPage from '../../pages/feed/feed'
import OrderInfoPage from '../../pages/order-info/order-info'
import { getIngredients } from '../../services/actions/burger-ingredients'
import { getUserData } from '../../services/actions/user'
import { ACCESS_TOKEN } from '../../services/constants'
import { getForgotPasswordSuccess, getUser } from '../../services/selectors'
import { getCookie } from '../../utils/cookies'
import AppHeader from '../app-header/app-header'
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import OrderList from '../order/order-list'
import {
	ProtectedRouteAuthElement,
	ProtectedRouteElement,
} from '../protected-route'

const App = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const location = useLocation()

	const locationState = location.state as {
		ingredientBackground?: Location
		background?: Location
		number?: number
	}
	const ingredientBackground =
		locationState && locationState.ingredientBackground
	const orderBackground = locationState && locationState.background
	const orderNumber = locationState && locationState.number
	const background = ingredientBackground || orderBackground

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
		navigate(-1)
	}

	return (
		<>
			<AppHeader />
			<Routes location={background || location}>
				<Route path={MAIN} element={<MainPage />} />
				<Route path={FEED} element={<FeedPage />} />
				<Route path={FEED_INFO} element={<OrderInfoPage />} />
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
				<Route
					path={PROFILE_ORDERS}
					element={
						<ProtectedRouteAuthElement
							element={
								<ProfilePage>
									<OrderList />
								</ProfilePage>
							}
							allowed={!!user || !!access}
						/>
					}
				/>
				<Route
					path={ORDERS_INFO}
					element={
						<ProtectedRouteAuthElement
							element={<OrderInfoPage />}
							allowed={!!user || !!access}
						/>
					}
				/>
				<Route path='*' element={<NotFound404Page />} />
			</Routes>

			{ingredientBackground && (
				<Routes>
					<Route
						path={INGREDIENT}
						element={
							<Modal
								title='Детали ингредиента'
								titleSize='main-large'
								onClose={handleClose}
							>
								<IngredientDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
			{orderBackground && (
				<Routes>
					<Route
						path={ORDERS_INFO}
						element={
							<ProtectedRouteAuthElement
								element={
									<Modal
										title={`#${orderNumber}`}
										titleSize='digits-default'
										onClose={handleClose}
									>
										<OrderDetails showTitle={false} />
									</Modal>
								}
								allowed={!!user || !!access}
							/>
						}
					/>
				</Routes>
			)}
			{orderBackground && (
				<Routes>
					<Route
						path={FEED_INFO}
						element={
							<Modal
								title={`#${orderNumber}`}
								titleSize='digits-default'
								onClose={handleClose}
							>
								<OrderDetails showTitle={false} />
							</Modal>
						}
					/>
				</Routes>
			)}
		</>
	)
}

export default App
