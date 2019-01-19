import { HIDE_SHOW_ANALYSER } from './types'

export const hideShowAnalyser = show => dispatch => {
  return dispatch ({
    type: HIDE_SHOW_ANALYSER,
    payload: show
  })
}
