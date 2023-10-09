import {
	ADD_BUN,
	ADD_FILLING,
	CLOSE_INFO,
	DELETE_FILLING,
	GET_ORDER_FAILED,
	GET_ORDER_REQUEST,
	GET_ORDER_SUCCESS
} from '../actions/burger-constructor.js'

const initialState = {
  burger: {
		buns: [],
		fillings: [],
	},
	
	order: null,
  oderRequest: false,
  orderFailed: false

};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
				order: action.order,
        orderRequest: false
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
				order: null
      };
    }
    case CLOSE_INFO: {
      return {
        ...state,
        order: null,
      };
    }
		case ADD_BUN: {
			return {
				...state,
				burger: {
					...state.burger,
					buns: [action.bun, action.bun]
				}
			};
		}
		case ADD_FILLING: {
			return {
				...state,
				burger: {
					...state.burger,
					fillings: [
						...state.burger.fillings,
						action.filling
					]}
			};
		}
		case DELETE_FILLING: {
			return {
				...state,
				burger: {
					...state.burger,
					fillings: [...state.burger.fillings].filter(item => item.id !== action.id)
				}
			};
		}
    default: {
      return state;
    }
  }
};