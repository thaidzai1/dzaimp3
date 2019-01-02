import axios from 'axios'

import { GET_NEW_ALBUMS, GET_ALBUM_DETAIL, GET_ALBUM_SONGS } from './types'

export const getNewAlbums = () => async dispatch => {
  let res;
  try {
    res = await axios.get('/api/newalbum');
    return dispatch({
      type: GET_NEW_ALBUMS,
      payload: res.data
    })
  }
  catch(err) {
    console.log(err);
  }
}

export const getAlbumDetail = album_id => async dispatch => {
  let res;
  try {
    res = await axios.get(`/api/album/${album_id}`);

    return dispatch({
      type: GET_ALBUM_DETAIL,
      payload: res.data
    })
  }
  catch(err) {
    console.log(err);
  }
}

export const getAlbumSongs = album_id => async dispatch => {
  let res;
  try {
    res = await axios.get(`/api/album/song/${album_id}`);
    
    return dispatch({
      type: GET_ALBUM_SONGS,
      payload: res.data
    })
  }
  catch(err) {
    console.log(err);
  }
}