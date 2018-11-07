import axios from 'axios'

import { GET_NEW_SONGS } from './types'

export const getNewSongs = () => async dispatch => {
  const res = await axios.get('/api/song/new');

  return dispatch({
    type: GET_NEW_SONGS,
    payload: res.data
  })
}
