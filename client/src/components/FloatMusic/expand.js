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
    handlePlay, handleCloseFloat, togglePlaylist, startPlaylist, playSongInPlaylist, removeSongFromPlaylist, playlistAutoNext, createPlaylist, deletePlaylist
  } = props;

  return (
    <div className='expand-holder'>
      <div className='song-details'>
        <div className='song-image'></div>
        <h2>
          <Link to={player ? `/song/${player.song.songName}/${player.song._id}` : ''}>
            {player !== null ? player.song.songName : "This is song's name"}
          </Link>
        </h2>
      </div>
      <div className='options'>
        <div className='buttons'>
          <button><FontAwesomeIcon icon={faFastBackward} /></button>
          <button
            onClick={handlePlay}>
            {playing ? <FontAwesomeIcon icon={faPause}/> : <FontAwesomeIcon icon={faPlay}/>}
          </button>
          <button><FontAwesomeIcon icon={faFastForward} onClick={player && player.playlist ? playlistAutoNext : null} /></button>
        </div>
        <div className='seek-bar'>
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
