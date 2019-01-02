import { HIDE_SHOW_ANALYSER } from '../actions/types'

const initialState = {
  show: false
}

export default  function(state = initialState, action) {
	switch(action.type) {
    case HIDE_SHOW_ANALYSER:
      return {
        ...state,
        show: action.payload
      }
    default:
      return state;
  }
}
