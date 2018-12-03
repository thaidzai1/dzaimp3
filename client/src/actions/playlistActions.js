import axios from 'axios'

import { GET_USER_PLAYLIST } from './types'

export const getUserPlaylist = user_id => async dispatch => {
  const res = await axios.get(`/api/playlist/${user_id}`);

  if(res.status === 200) {
    return dispatch({
      type: GET_USER_PLAYLIST,
      payload: res.data.list
    })
  }
}
