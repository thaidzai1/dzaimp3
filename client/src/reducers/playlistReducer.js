import { GET_USER_PLAYLIST } from '../actions/types'

const initialState = null;

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_USER_PLAYLIST:
    console.log('reducer', action.payload);
      return {
        ...state,
        list: action.payload
      }
    default:
      return state;
  }
}
