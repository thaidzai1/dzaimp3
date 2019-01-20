import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const initialState = {};

const store = createStore (
  reducers,
  initialState,
  compose(
    applyMiddleware(thunk)
  )
)

export default store
