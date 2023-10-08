import {
  CLOSE_INFO,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  SHOW_INFO
} from '../actions/burger-ingredients.js'

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  infoAboutIngredient: null,
  showInfo: false
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.ingredients,
        ingredientsRequest: false
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false
      };
    }
    case SHOW_INFO: {
      return {
        ...state,
        infoAboutIngredient: action.item,
        showInfo: true
      };
    }
    case CLOSE_INFO: {
      return {
        ...state,
        showInfo: false,
        infoAboutIngredient: null
      };
    }
    default: {
      return state;
    }
  }
};