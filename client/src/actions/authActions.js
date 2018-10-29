import axios from 'axios'

import { GET_CURRENT_USER } from './types'

export const getCurrentUser = () => async dispatch => {
  const res = await axios.get('/auth/current_user');
  console.log(res);
  if(res.status === 200){
    return dispatch ({
      type: GET_CURRENT_USER,
      payload: res.data
    })
  }
}
