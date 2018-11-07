import axios from 'axios'

import { GET_SONG_AUDIO } from './types'

export const getSongAudio= song_id => async dispatch => {
  const res = await axios.get(`/api/song/${song_id}`);
  const {audio: song_audio, songName, singer, poster, song_image} = res.data;
  let audio = new Audio();
  audio.src = `/audio/${song_audio}`;
  audio.autoplay = true;
  let song = {audio, songName, singer, poster, song_image};
  return dispatch({
    type: GET_SONG_AUDIO,
    payload: song
  })
}
