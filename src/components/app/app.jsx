import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import {
	ForgotPasswordPage,
	LoginPage,
	MainPage,
	NotFound404Page,
	RegisterPage,
	ResetPasswordPage,
} from '../../pages'

import AppHeader from '../app-header/app-header'

const App = () => {
	return (
		<>
			<AppHeader />
			<Router>
				<Routes>
					<Route exact path='/' element={<MainPage />} />
					<Route exact path='/login' element={<LoginPage />} />
					<Route exact path='/register' element={<RegisterPage />} />
					<Route
						exact
						path='/forgot-password'
						element={<ForgotPasswordPage />}
					/>
					<Route exact path='/reset-password' element={<ResetPasswordPage />} />
					<Route exact path='*' element={<NotFound404Page />} />
				</Routes>
			</Router>
		</>
	)
}

export default App
