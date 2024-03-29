import { combineReducers } from 'redux'
import authReducer from './authReducer'
import playerReducer from './playerReducer'
import songReducer from './songReducer'
import playlistReducer from './playlistReducer'
import analyserReducer from './analyserReducer'
import albumReducer from './albumReducer'
import searchReducer from './searchReducer'
import UIreducer from './UIreducer'

export default combineReducers({
  auth: authReducer,
  player: playerReducer,
  song: songReducer,
  playlist: playlistReducer,
  analyser: analyserReducer,
  album: albumReducer,
  search: searchReducer,
  UI: UIreducer
})
