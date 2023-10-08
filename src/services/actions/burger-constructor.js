import { getOrderRequest } from '../../utils/requests'

export const SHOW_INFO = 'SHOW_INFO';
export const CLOSE_INFO = 'CLOSE_INFO';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const ADD_BUN = 'ADD_BUN';
export const ADD_FILLING = 'ADD_FILLING';
export const DELETE_FILLING = 'DELETE_FILLING';

export function getOrder(ids) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getOrderRequest(ids).then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.data
        });
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        });
      }
    })
    .catch((e) => {
      console.log(e.message);
      console.log(e.response)
    });
  };
}