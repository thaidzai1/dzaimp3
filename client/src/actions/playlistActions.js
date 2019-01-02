import axios from 'axios'

import {
  GET_USER_PLAYLIST,
  ADD_SONG_TO_PLAYLIST,
  REMOVE_SONG_FROM_PLAYLIST,
  CREATE_NEW_PLAYLIST,
  DELETE_PLAYLIST
} from './types'

export const getUserPlaylist = user_id => async dispatch => {
  const res = await axios.get(`/api/playlist/${user_id}`);
  console.log(res);
  if(res.status === 200) {
    return dispatch({
      type: GET_USER_PLAYLIST,
      payload: res.data.list
    })
  }
}

export const createPlaylist = (user_id, list_name) => async dispatch => {
  let res;
  try {
    res = await axios.put(`/api/playlist/new/${user_id}`, list_name);

    return dispatch({
      type: CREATE_NEW_PLAYLIST,
      payload: res.data
    })
  }
  catch(err){
  }
}

export const deletePlaylist = (user_id, list_id) => async dispatch => {
  let res;
  try {
    res = await axios.put(`/api/playlist/delete/${user_id}/${list_id}`);
    console.log(res);
    if(res.status === 200) {
      return dispatch({
        type: DELETE_PLAYLIST,
        payload: list_id
      })
    }
  }
  catch(err) {

  }
}

export const addSongToPlaylist = (user_id, list_id, song_id) => async dispatch => {
  console.log(user_id, list_id, song_id);
  let res;
  try{
    res = await axios.put(`/api/playlist/addsong/${user_id}/${list_id}/${song_id}`);
    if(res.status === 200) {
      return dispatch({
        type: ADD_SONG_TO_PLAYLIST,
        payload: res.data
      })
    }
  }
  catch(err) {
    console.log(err.config)
  }
}

export const removeSongFromPlaylist = (user_id, list_id, song_id) => async dispatch => {
  let res;
  try {
    res = await axios.put(`/api/playlist/remove/${user_id}/${list_id}/${song_id}`);
    if(res.status === 200) {
      return dispatch({
        type: REMOVE_SONG_FROM_PLAYLIST,
        payload: {list_id, song_id}
      })
    }
  }
  catch(err) {

  }
}
