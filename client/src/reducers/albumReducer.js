import { GET_NEW_ALBUMS, GET_ALBUM_DETAIL, GET_ALBUM_SONGS } from '../actions/types'

const initialState = {
  newAlbums: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_NEW_ALBUMS:
      return {
        ...state,
        newAlbums: action.payload
      }
    case GET_ALBUM_DETAIL: 
      return {
        ...state,
        detail: action.payload
      }
    case GET_ALBUM_SONGS: 
      return {
        ...state,
        songs: action.payload
      }
    default:
      return state;
  }
}
