import {
  GET_SONG_AUDIO, START_PLAYLIST, PLAYLIST_QUEUE_NEXT, UPDATE_PLAYER_PLAYLIST, HIDE_SHOW_ANALYSER
} from '../actions/types'

const initialState = null;

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_SONG_AUDIO:
      return {
        ...state,
        song: action.payload,
        playlist: null
      }
    case START_PLAYLIST:
      return {
        ...state,
        _id: action.payload.list_id,
        nowSong: action.payload.songIndex,
        song: action.payload.audio,
        playlist: action.payload.playlist
      }
    case PLAYLIST_QUEUE_NEXT:
      return {
        ...state,
        song: action.payload.audio,
        nowSong: action.payload.nowSong,
        playlist: action.payload.playlist
      }
    case UPDATE_PLAYER_PLAYLIST:
      return {
        ...state
      }
    default:
      return state;
  }
}
