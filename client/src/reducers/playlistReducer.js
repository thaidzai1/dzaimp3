import {
  GET_USER_PLAYLIST,
  ADD_SONG_TO_PLAYLIST,
  REMOVE_SONG_FROM_PLAYLIST,
  CREATE_NEW_PLAYLIST,
  DELETE_PLAYLIST
} from '../actions/types'

const initialState = null;

export default function(state = initialState, action) {
  let list = [];
  switch(action.type) {
    case GET_USER_PLAYLIST:
      return {
        ...state,
        list: [...action.payload]
      }
    case ADD_SONG_TO_PLAYLIST:
      list = JSON.parse(JSON.stringify(state.list));
      list.map(item => {
        if(item._id === action.payload.list_id) {
          item.songs.push(action.payload.song);
        }
      })
      console.log('reducer', list, state.list);
      return {
        ...state,
        list
      }
    case REMOVE_SONG_FROM_PLAYLIST:
      list = JSON.parse(JSON.stringify(state.list));
      list.map(item => {
        if(item._id === action.payload.list_id) {
          item.songs.map((song, index) => {
            if(song._id === action.payload.song_id) {
              item.songs.splice(index, 1);
            }
          })
        }
      })

      return {
        ...state,
        list
      }
    case CREATE_NEW_PLAYLIST:
      list = JSON.parse(JSON.stringify(state.list));
      return {
        ...state,
        list: [...list, action.payload]
      }
    case DELETE_PLAYLIST:
      list = JSON.parse(JSON.stringify(state.list));
      list.map((item, index) => {
        if(item._id === action.payload) {
          list.splice(index, 1);
        }
      })
      
      return {
        ...state,
        list
      }
    default:
      return state;
  }
}
