import { GET_SONG_AUDIO } from '../actions/types'

const initialState = null;

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_SONG_AUDIO:
      return {
        ...state,
        song: action.payload
      }
    default:
      return state;
  }
}
