import { combineReducers } from 'redux'
import authReducer from './authReducer'
import playerReducer from './playerReducer'
import songReducer from './songReducer'

export default combineReducers({
  auth: authReducer,
  player: playerReducer,
  song: songReducer
})
