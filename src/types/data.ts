export type TIngredient = {
	_id: string
	name: string
	type: string
	proteins: number
	fat: number
	carbohydrates: number
	calories: number
	price: number
	image: string
	image_mobile: string
	image_large: string
	__v: number
}

export type TBurgerIngredient = TIngredient & { id?: string }

export type TOrder = {
	name: string
	order: { number: number }
} | null

export type TOrderData = {
	_id: string
	ingredients: Array<string>
	status: string
	name: string
	createdAt: string | number | Date
	updatedAt: string
	number: number
}

export type TBurger = {
	buns: Array<TIngredient>
	fillings: Array<TBurgerIngredient>
}

type TServerResponse<T> = {
	success: boolean
} & T

export type TRefreshResponse = TServerResponse<{
	accessToken: string
	refreshToken: string
}>

export type TOrderResponse = TServerResponse<TOrder>

export type TIngredientResponse = TServerResponse<{ data: Array<TIngredient> }>

export type TUser = {
	email: string
	name: string
}

export type TLoginUser = {
	email: string
	password: string
}

export type TRegisterUser = TUser & { password: string }

export type TNewPassword = {
	password: string
	token: string
}

export type TUserResponse = TServerResponse<{ user: TUser }>

export type TAuthResponse = TServerResponse<{
	user: TUser
	accessToken: string
	refreshToken: string
}>

export type TMessageResponse = TServerResponse<{ message: string }>

export type TUserOrderResponse = TServerResponse<{ orders: Array<TOrderData> }>
