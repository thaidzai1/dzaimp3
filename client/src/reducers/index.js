import { combineReducers } from 'redux'
import authReducer from './authReducer'
import playerReducer from './playerReducer'
import songReducer from './songReducer'
import playlistReducer from './playlistReducer'
import analyserReducer from './analyserReducer'
import albumReducer from './albumReducer'

export default combineReducers({
  auth: authReducer,
  player: playerReducer,
  song: songReducer,
  playlist: playlistReducer,
  analyser: analyserReducer,
  album: albumReducer
})
