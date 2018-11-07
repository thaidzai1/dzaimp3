import { GET_NEW_SONGS } from '../actions/types'

const initialState = {
  newSong: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_NEW_SONGS:
      return {
        ...state,
        newSong: action.payload
      }
    default: return state
  }
}
