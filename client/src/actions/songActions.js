import axios from 'axios'

import { GET_NEW_SONGS, GET_SONG_PAGING, FETCH_SONG_SCROLL } from './types'

export const getNewSongs = () => async dispatch => {
  const res = await axios.get('/api/song/new');

  return dispatch({
    type: GET_NEW_SONGS,
    payload: res.data
  })
}

export const getSongWithPaging = page => async dispatch => {
  let res;
  try {
    res = await axios.get(`/api/allsongs/${page}`);
    console.log(res);
    if(res.status === 200) {
      console.log(res);
      return dispatch({
        type: GET_SONG_PAGING,
        payload: res.data
      })
    }
  }
  catch(e) {

  }
}

export const fetchSongOnScroll = page => async dispatch => {
  let res;
  try {
    res = await axios.get(`/api/allsongs/${page}`);
    console.log(res);
    if(res.status === 200) {
      return dispatch({
        type: FETCH_SONG_SCROLL,
        payload: res.data
      })
    }
  }
  catch(e) {
  }
}