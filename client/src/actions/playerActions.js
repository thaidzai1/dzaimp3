import axios from 'axios'

import { GET_SONG_AUDIO, START_PLAYLIST, PLAYLIST_QUEUE_NEXT } from './types'

export const getSongAudio= song_id => async dispatch => {
  const res = await axios.get(`/api/song/${song_id}`);
  const {audio: song_audio, songName, singer, poster, song_image} = res.data;
  let audio = new Audio();
  audio.src = `/audio/${song_audio}`;
  // audio.autoplay = true;
  let song = {audio, songName, singer, poster, song_image};
  return dispatch({
    type: GET_SONG_AUDIO,
    payload: song
  })
}

export const startPlaylist = (playlist, songIndex = 0) => async dispatch => {
  let list = [];
  playlist.map(({_id, songName, audio, poster, singer}) => {
    let audio_file = new Audio();
    audio_file.src = `/audio/${audio}`;
    // audio_file.autoplay = true;
    list.push({_id, songName, audio: audio_file, poster, singer});
  })
  console.log(list, songIndex);
  return dispatch({
    type: START_PLAYLIST,
    payload: {list, songIndex}
  })
}

export const playlistAutoNext = (nextSong, nowSong) => dispatch => {
  return dispatch({
    type: PLAYLIST_QUEUE_NEXT,
    payload: {nextSong, nowSong}
  })
}
