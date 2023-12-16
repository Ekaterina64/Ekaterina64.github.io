import { expect } from '@jest/globals'
import * as actions from '../../actions/user'

import { initialState, userReducer } from './user'

describe('User reducer', () => {
	it('should return initial state', () => {
		let state = {
			loginRequest: true,
			loginFailed: true,

			logoutRequest: true,
			logoutFailed: true,

			userDataLoaded: true,
			userDataRequest: true,
			userDataFailed: true,

			accessTokenRequest: true,
			accessTokenFailed: true,

			registerRequest: true,
			registerFailed: true,

			forgotPasswordRequest: true,
			forgotPasswordFailed: true,
			forgotPasswordSuccess: true,

			resetPasswordRequest: true,
			resetPasswordFailed: true,
			resetPasswordSuccess: true,

			updateUserRequest: true,
			updateUserFailed: true,

			isAuthenticated: true,
			user: { name: 'Test', email: 'test@' },
			accessToken: 'qiiekdvkf1',
			refreshToken: 'gidkjsfjgols',
		}
		expect(userReducer(undefined, {})).toEqual(initialState)
		expect(userReducer(state, actions.userLogoutSuccess())).toEqual(
			initialState
		)
	})

	it('should set request flags', () => {
		expect(userReducer(initialState, actions.userLoginReq())).toEqual({
			...initialState,
			loginRequest: true,
		})
		expect(userReducer(initialState, actions.userLogoutReq())).toEqual({
			...initialState,
			logoutRequest: true,
		})
		expect(userReducer(initialState, actions.userDataReq())).toEqual({
			...initialState,
			userDataRequest: true,
		})
		expect(userReducer(initialState, actions.registerReq())).toEqual({
			...initialState,
			registerRequest: true,
		})
		expect(userReducer(initialState, actions.forgotPasswordReq())).toEqual({
			...initialState,
			forgotPasswordRequest: true,
		})
		expect(userReducer(initialState, actions.resetPasswordReq())).toEqual({
			...initialState,
			resetPasswordRequest: true,
		})
		expect(userReducer(initialState, actions.updateUserReq())).toEqual({
			...initialState,
			updateUserRequest: true,
		})
	})

	it('should set failed flags', () => {
		expect(userReducer(initialState, actions.userLoginFailed())).toEqual({
			...initialState,
			loginRequest: false,
			loginFailed: true,
		})
		expect(userReducer(initialState, actions.userLogoutFailed())).toEqual({
			...initialState,
			logoutRequest: false,
			logoutFailed: true,
		})
		expect(userReducer(initialState, actions.userDataFailed())).toEqual({
			...initialState,
			userDataRequest: false,
			userDataFailed: true,
		})
		expect(userReducer(initialState, actions.registerFailed())).toEqual({
			...initialState,
			registerRequest: false,
			registerFailed: true,
		})
		expect(userReducer(initialState, actions.forgotPasswordFailed())).toEqual({
			...initialState,
			forgotPasswordRequest: false,
			forgotPasswordFailed: true,
			forgotPasswordSuccess: false,
		})
		expect(userReducer(initialState, actions.resetPasswordFailed())).toEqual({
			...initialState,
			resetPasswordRequest: false,
			resetPasswordFailed: true,
			resetPasswordSuccess: false,
		})
		expect(userReducer(initialState, actions.updateUserFailed())).toEqual({
			...initialState,
			updateUserRequest: false,
			updateUserFailed: true,
		})
	})

	it("should handle the user's login", () => {
		let response = {
			success: true,
			user: { email: 'email', name: 'name' },
			accessToken: 'Bearer accessToken',
			refreshToken: 'refreshToken',
		}
		expect(
			userReducer(initialState, actions.userLoginSuccess(response))
		).toEqual({
			...initialState,
			loginRequest: false,
			loginFailed: false,
			userDataLoaded: true,
			isAuthenticated: true,
			user: response.user,
			accessToken: response.accessToken.split('Bearer ')[1],
			refreshToken: response.refreshToken,
		})
	})

	it("should process the user's receipt", () => {
		let response = { success: true, user: { email: 'email', name: 'name' } }
		expect(
			userReducer(initialState, actions.userDataSuccess(response))
		).toEqual({
			...initialState,
			userDataRequest: false,
			userDataLoaded: true,
			isAuthenticated: true,
			user: response.user,
		})
	})

	it('should process the user registration', () => {
		let response = {
			success: true,
			user: { email: 'email', name: 'name' },
			accessToken: 'Bearer accessToken',
			refreshToken: 'refreshToken',
		}
		expect(
			userReducer(initialState, actions.registerSuccess(response))
		).toEqual({
			...initialState,
			registerRequest: false,
			userDataLoaded: true,
			isAuthenticated: true,
			user: response.user,
			accessToken: response.accessToken.split('Bearer ')[1],
			refreshToken: response.refreshToken,
		})
	})

	it('should handle the success of the password recovery request', () => {
		expect(userReducer(initialState, actions.forgotPasswordSuccess())).toEqual({
			...initialState,
			forgotPasswordRequest: false,
			forgotPasswordSuccess: true,
		})
	})

	it('should update the user', () => {
		let state = {
			updateUserRequest: true,
			user: { name: 'Test', email: 'Test@' },
		}
		let response = { success: true, user: { email: 'email', name: 'name' } }
		expect(userReducer(state, actions.updateUserSuccess(response))).toEqual({
			...state,
			updateUserRequest: false,
			user: response.user,
		})
	})
})
