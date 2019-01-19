import axios from 'axios'

import {
  GET_SONG_AUDIO, START_PLAYLIST, PLAYLIST_QUEUE_NEXT, UPDATE_PLAYER_PLAYLIST, PLAYLIST_QUEUE_PREVIOUS
 } from './types'

 //This will save the playlist is being played in player
 //Reason for this: user can delete, add songs while playing that playlist
 //So we can update the list and next song and previous song.
const initalPlayer = {
  playlist: null,
  nextSong: null,
  nowSong: null,
  nextSongIndex: null
}

//Just use to create a song audio
export const getSongAudio= song_id => async dispatch => {
  const res = await axios.get(`/api/song/${song_id}`);

  let audio = new Audio();
  audio.src = `/audio/${res.data.audio}`;
  // audio.autoplay = true;
  let song = {...res.data, audio};
  return dispatch({
    type: GET_SONG_AUDIO,
    payload: song
  })
}

//Start playing a playlist
export const startPlaylist = (playlist, list_id, songIndex = 0, user_id) => async dispatch => {
  //generate a audio object to play song in play list depend on songIndex.
  let audio = generateAudio(playlist[songIndex]);
  //This is deep clone (nested array object array). Why do this?
  //Avoid using same memory place. Why not? 
  //This mutual => change this will affect or be affected by playlist you pass in
  initalPlayer.playlist = JSON.parse(JSON.stringify(playlist));
  //Just initialize some variable
  if(songIndex + 1 < playlist.length){
    initalPlayer.nextSongIndex = songIndex + 1;
    initalPlayer.nextSong = playlist[songIndex + 1]._id;
    initalPlayer.nowSong = playlist[songIndex]._id;
  }

  console.log(initalPlayer);
  return dispatch({
    type: START_PLAYLIST,
    payload: {playlist: initalPlayer.playlist, songIndex, audio, list_id, user_id}
  })
}

//Just generate audio object
const generateAudio = song => {
  let audio = new Audio();
  audio.src = `/audio/${song.audio}`;
  audio.muted = true;
  return {...song, audio};
}

//This excute when the playing playlist is updated (add or delete songs)? Why do this?
//Player can know what song will be next or previous, although playlist is completely mess
//after user add or del songs
export const updatePlayerPlaylist = list => dispatch => {
  let { nextSong, nextSongIndex, playlist } = initalPlayer;
  console.log(list);
  console.log(initalPlayer);

  //if nextSong null nothing to do => It's not playing? What happend when its not null
  //Ofcourse the song is playing
  if(nextSong !== null ) {
    //Just check the next song is still there of being del by user. Why do this?
    //Because the next song can be del by user. Next? 
    if(list.filter(song => song._id === nextSong).length === 0) {
      //This situation next song is deleted => But we got nextSongIndex
      //We use it to get next song id. It's simple. Another situation?
      initalPlayer.nextSong = list[nextSongIndex];
    }
    //Next song still there. But it's index in playlist MAYBE changed. Why?
    //Because a song is del or added make indexes change. SO what do we check?
    //1. first check => if undefined => All next song is del (simple: nowSong is last in playlist).WHWy happend this?
    //Because user just delete songs below the playing song.
    //2. second => if _id is different => some above the playing is del. What should we do?
    else if(list[nextSongIndex] === undefined || list[nextSongIndex]._id !== nextSong) {
      //solution: Just degrea nextSOnIndex 1. WHy?
      //
      initalPlayer.nextSongIndex = nextSongIndex - 1;
    }
  }
  initalPlayer.playlist = JSON.parse(JSON.stringify(list));
  // return dispatch({
  //   type: UPDATE_PLAYER_PLAYLIST,
  //   payload: playlist
  // })
}

export const playlistAutoNext = () => async dispatch => {
  let { playlist } = initalPlayer;
  //Just generate audio obj for next song
  let audio = generateAudio(playlist[initalPlayer.nextSongIndex]);
  //Check last song in playlilst or not. No?
  //nextSongIndex increase 1 and get new ID for nowSOng and nextSOng
  if(initalPlayer.nextSongIndex + 1 < playlist.length){
    initalPlayer.nextSongIndex += 1;
    initalPlayer.nextSong = playlist[initalPlayer.nextSongIndex]._id;
    initalPlayer.nowSong = playlist[initalPlayer.nextSongIndex - 1]._id;
  }
  //Last song so no need increase
  else {
    initalPlayer.nextSong = playlist[initalPlayer.nextSongIndex]._id;
    initalPlayer.nowSong = playlist[initalPlayer.nextSongIndex]._id;
  }
  
  return dispatch({
    type: PLAYLIST_QUEUE_NEXT,
    payload: {audio, playlist}
  })
}

export const playlistPrevious = () => async dispatch => {
  let { playlist } = initalPlayer;
  let audio;

  console.log(initalPlayer.nextSongIndex, playlist.length);
  //Check the playing song is last in playlist? Yes?
  //SO the previous song just need decreased 1.
  //Because the playing song is the last, no have next song.
  if(initalPlayer.nowSong === playlist[playlist.length - 1]._id) {
    audio = generateAudio(playlist[initalPlayer.nextSongIndex - 1]);
  }
  //Just another situation.
  else {
    audio = generateAudio(playlist[initalPlayer.nextSongIndex - 2]);
  }

  //Check the now song is first? No?
  //So it still has previous song
  if(initalPlayer.nextSongIndex - 1 > 0) {
    //Check the now song is last or not? No?
    //SO the previous song index = nextSongIndex - 1.
    if(initalPlayer.nowSong !== playlist[initalPlayer.playlist.length - 1]._id) {
      initalPlayer.nextSongIndex -= 1;
      initalPlayer.nextSong = playlist[initalPlayer.nextSongIndex]._id;
    }
    //If now song is last song => no need to decrease nextSongIndex.
    //Because the n-2 song and nextSongIndex still n-1 => nextSOngIndex stand still
    //=> No need decrease when nowsong = last song in playlist.
    initalPlayer.nowSong = playlist[initalPlayer.nextSongIndex - 1]._id;
  }

  console.log(initalPlayer);

  return dispatch({
    type: PLAYLIST_QUEUE_PREVIOUS,
    payload: { audio, playlist }
  })
}