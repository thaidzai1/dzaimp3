import axios from 'axios'

import {
  GET_SONG_AUDIO, START_PLAYLIST, PLAYLIST_QUEUE_NEXT, UPDATE_PLAYER_PLAYLIST
 } from './types'

const initalPlayer = {
  playlist: null,
  nextSong: null,
  nextSongIndex: null
}

export const getSongAudio= song_id => async dispatch => {
  const res = await axios.get(`/api/song/${song_id}`);

  let audio = new Audio();
  audio.src = `/audio/${res.data.audio}`;
  audio.autoplay = true;
  let song = {...res.data, audio};
  return dispatch({
    type: GET_SONG_AUDIO,
    payload: song
  })
}

export const startPlaylist = (playlist, list_id, songIndex = 0) => async dispatch => {
  let audio = generateAudio(playlist[songIndex]);
  initalPlayer.playlist = [...playlist];
  if(songIndex + 1 < playlist.length){
    initalPlayer.nextSongIndex = songIndex + 1;
    initalPlayer.nextSong = playlist[songIndex + 1]._id;
  }

  console.log(initalPlayer);
  return dispatch({
    type: START_PLAYLIST,
    payload: {playlist, songIndex, audio, list_id}
  })
}

const generateAudio = song => {
  let audio = new Audio();
  audio.src = `/audio/${song.audio}`;
  return {...song, audio};
}

export const updatePlayerPlaylist = list => dispatch => {
  let { nextSong, nextSongIndex, playlist } = initalPlayer;
  if(nextSong !== null ) {
    if(list.filter(song => song._id === nextSong._id).length === 0) {
      initalPlayer.nextSong = list[nextSongIndex];
    }
    else if(list[nextSongIndex] === undefined || list[nextSongIndex]._id !== nextSong._id) {
      initalPlayer.nextSongIndex = nextSongIndex - 1;
    }
  }
  initalPlayer.playlist = [...list];
}

export const playlistAutoNext = () => async dispatch => {
  let { playlist } = initalPlayer;
  let audio = generateAudio(playlist[initalPlayer.nextSongIndex]);
  if(initalPlayer.nextSongIndex + 1 < playlist.length){
    initalPlayer.nextSongIndex += 1;
    initalPlayer.nextSong = playlist[initalPlayer.nextSongIndex];
  }

  return dispatch({
    type: PLAYLIST_QUEUE_NEXT,
    payload: {audio, playlist}
  })
}
