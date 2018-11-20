import { GET_CURRENT_USER, SIGN_UP, LOGIN } from '../actions/types'

const initialState = null;

export default function (state = initialState, action){
  switch(action.type){
    case GET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      }
    case LOGIN:
      console.log(action.payload);
      return {
        ...state,
        user: action.payload
      }
    case SIGN_UP:
      return {
        ...state
      }
    default:
      return state;
  }
}
