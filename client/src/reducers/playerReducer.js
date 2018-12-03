import { GET_SONG_AUDIO, START_PLAYLIST, PLAYLIST_QUEUE_NEXT } from '../actions/types'

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
        nowSong: action.payload.songIndex,
        song: action.payload.list[action.payload.songIndex],
        playlist: action.payload.list
      }
    case PLAYLIST_QUEUE_NEXT:
      return {
        ...state,
        song: action.payload.nextSong,
        nowSong: action.payload.nowSong
      }
    default:
      return state;
  }
}
