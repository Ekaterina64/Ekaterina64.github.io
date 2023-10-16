import {
	FORGOT_PASSWORD_FAILED,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	REFRESH_ACCESS_TOKEN_FAILED,
	REFRESH_ACCESS_TOKEN_REQUEST,
	REFRESH_ACCESS_TOKEN_SUCCESS,
	REGISTER_FAILED,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	RESET_PASSWORD_FAILED,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	USER_DATA_FAILED,
	USER_DATA_REQUEST,
	USER_DATA_SUCCESS,
	USER_LOGIN_FAILED,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT_FAILED,
	USER_LOGOUT_REQUEST,
	USER_LOGOUT_SUCCESS,
} from '../actions/user.js'

const initialState = {
	loginRequest: false,
	loginFailed: false,

	logoutRequest: false,
	logoutFailed: false,

	userDataLoaded: false,
	userDataRequest: false,
	userDataFailed: false,

	accessTokenRequest: false,
	accessTokenFailed: false,

	registerRequest: false,
	registerFailed: false,

	forgotPasswordRequest: false,
	forgotPasswordFailed: false,

	mayResetPassword: false,

	resetPasswordRequest: false,
	resetPasswordFailed: false,

	isAuthenticated: false,
	user: {
		email: '',
		name: '',
	},
	accessToken: '',
	refreshToken: '',
}

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { ...state, loginRequest: true }
		case USER_LOGIN_SUCCESS:
			return {
				...state,
				loginRequest: false,
				loginFailed: false,
				userDataLoaded: true,
				isAuthenticated: true,
				user: action.payload.user,
				accessToken: action.payload.accessToken.split('Bearer ')[1],
				refreshToken: action.payload.refreshToken,
			}
		case USER_LOGIN_FAILED:
			return { ...state, loginRequest: false, loginFailed: true }
		case USER_LOGOUT_REQUEST:
			return { ...state, logoutRequest: true }
		case USER_LOGOUT_SUCCESS:
			return initialState
		case USER_LOGOUT_FAILED:
			return { ...state, logoutRequest: false, logoutFailed: true }
		case USER_DATA_REQUEST:
			return { ...state, userDataRequest: true }
		case USER_DATA_SUCCESS:
			return {
				...state,
				userDataRequest: false,
				userDataLoaded: true,
				isAuthenticated: true,
				user: action.payload.user,
			}
		case USER_DATA_FAILED:
			return { ...state, userDataRequest: false, userDataFailed: true }
		case REGISTER_REQUEST:
			return { ...state, registerRequest: true }
		case REGISTER_SUCCESS:
			return {
				...state,
				registerRequest: false,
				userDataLoaded: true,
				isAuthenticated: true,
				user: action.payload.user,
				accessToken: action.payload.accessToken.split('Bearer ')[1],
				refreshToken: action.payload.refreshToken,
			}
		case REGISTER_FAILED:
			return { ...state, registerRequest: false, registerFailed: true }
		case FORGOT_PASSWORD_REQUEST:
			return { ...state, forgotPasswordRequest: true }
		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				forgotPasswordRequest: false,
				mayResetPassword: true,
			}
		case FORGOT_PASSWORD_FAILED:
			return {
				...state,
				forgotPasswordRequest: false,
				forgotPasswordFailed: true,
				mayResetPassword: false,
			}
		case RESET_PASSWORD_REQUEST:
			return { ...state, resetPasswordRequest: true }
		case RESET_PASSWORD_SUCCESS:
			return {
				...state,
				resetPasswordRequest: false,
			}
		case RESET_PASSWORD_FAILED:
			return {
				...state,
				resetPasswordRequest: false,
				resetPasswordFailed: true,
			}
		case REFRESH_ACCESS_TOKEN_REQUEST:
			return { ...state, accessTokenRequest: true }
		case REFRESH_ACCESS_TOKEN_SUCCESS:
			return {
				...state,
				accessTokenRequest: false,
				accessTokenFailed: false,
				accessToken: action.payload.accessToken.split('Bearer ')[1],
				refreshToken: action.payload.refreshToken,
			}
		case REFRESH_ACCESS_TOKEN_FAILED:
			return { ...state, accessTokenFailed: true }
		default:
			return state
	}
}
