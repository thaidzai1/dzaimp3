import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlay, faPause, faFastForward, faFastBackward, faList
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import Playlist from './playlist'

const ExpandFloat = props => {
  const {
    player, playing, show_playlist, auth, playlist,
    handlePlay, handleCloseFloat, togglePlaylist, startPlaylist, removeSongFromPlaylist, playlistAutoNext, createPlaylist,
    deletePlaylist, playlistPrevious
  } = props;

  const renderSongInfo = () => {
    if(player !== null) {
      if(player.playlist !== null){
        if(player.user_list){
          return (
            <Link to={`/playlist/${player._id}-${player.user_list}`}>
              {player.song.songName}
            </Link> 
          );
        }
        else {
          return (
            <Link to={`/album/listen=${player._id}`}>
              {player.song.songName}
            </Link> 
          )
        }
      }
      else {
        return (
          <Link to={`/song/${player.song.songName}/${player.song._id}`}>
            {player.song.songName}
          </Link>
        )
      }
    }
    return (
      <Link to={''}>
        {"This is song's name"}
      </Link>
    )
  }
  
  const handleFillBarClick = e => {
    console.log(e.nativeEvent.offsetX, e.target);
    if(player && (e.target.classList.contains('seek-bar') || e.target.classList.contains('fill'))) {
      let { song } = player;
      song.audio.currentTime = e.nativeEvent.offsetX/e.currentTarget.clientWidth * song.audio.duration;
    }
  } 

  return (
    <div className='expand-holder'>
      <div className='song-details'>
        {/* <div className='song-image'>
          
        </div> */}
        <img src={player ? `/image/poster/${player.song.poster}` : null} />
        <h2>
          {renderSongInfo()}
        </h2>
      </div>
      <div className='options'>
        <div className='buttons'>
          <button>
            <FontAwesomeIcon icon={faFastBackward} onClick={player && player.playlist ? playlistPrevious : null}/>
          </button>
          <button
            onClick={handlePlay}>
            {playing ? <FontAwesomeIcon icon={faPause}/> : <FontAwesomeIcon icon={faPlay}/>}
          </button>
          <button><FontAwesomeIcon icon={faFastForward} onClick={player && player.playlist ? playlistAutoNext : null} /></button>
        </div>
        <div className='seek-bar' onClick={event => handleFillBarClick(event)}>
          <div className='fill' id='fill-bar'></div>
          <div className='handle'></div>
        </div>
        <div className='playlist'>
          {
            show_playlist ? <Playlist
              auth={auth} playlist={playlist}
              startPlaylist={startPlaylist}
              removeSongFromPlaylist={removeSongFromPlaylist}
              createPlaylist={createPlaylist}
              deletePlaylist={deletePlaylist}
            /> : null
          }
          <FontAwesomeIcon icon={faList} onClick={togglePlaylist}/>
        </div>
        <div className='close' onClick={handleCloseFloat}>&#x2715;</div>
      </div>
    </div>
  )
}

ExpandFloat.propTypes = {
  player: PropTypes.object,
  auth: PropTypes.object,
  playlist: PropTypes.object,
  expand: PropTypes.bool,
  play: PropTypes.bool,
  playing: PropTypes.bool,
  show_playlist: PropTypes.bool,
  startPlaylist: PropTypes.func,
  playlistAutoNext: PropTypes.func,
  removeSongFromPlaylist: PropTypes.func,
  updatePlayerPlaylist: PropTypes.func,
  createPlaylist: PropTypes.func,
  deletePlaylist: PropTypes.func,
  handlePlay: PropTypes.func,
  handleCloseFloat: PropTypes.func,
  togglePlaylist: PropTypes.func,
}

export default ExpandFloat
