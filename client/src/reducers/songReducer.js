import { GET_NEW_SONGS, GET_SONG_PAGING, FETCH_SONG_SCROLL } from '../actions/types'

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
    case GET_SONG_PAGING: 
      return {
        ...state,
        songs: [...action.payload.songs],
        songQuantity: action.payload.songQuantity
      }
    case FETCH_SONG_SCROLL: 
      return {
        ...state,
        songs: [...state.songs, ...action.payload.songs],
        songQuantity: action.payload.songQuantity
      }
    default: return state
  }
}
