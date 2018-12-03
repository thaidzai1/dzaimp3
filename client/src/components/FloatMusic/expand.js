import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faFastForward, faFastBackward, faList } from '@fortawesome/free-solid-svg-icons'

import Playlist from './playlist'

const ExpandFloat = props => {
  const {
     player, playing, show_playlist, auth, playlist,
      handlePlay, handleCloseFloat, togglePlaylist, startPlaylist, playSongInPlaylist
  } = props;

  return (
    <div className='expand-holder'>
      <div className='song-details'>
        <div className='song-image'></div>
        <h2>{player !== null ? player.song.songName : "This is song's name"}</h2>
      </div>
      <div className='options'>
        <div className='buttons'>
          <button><FontAwesomeIcon icon={faFastBackward} /></button>
          <button
            onClick={handlePlay}>
            {playing ? <FontAwesomeIcon icon={faPause}/> : <FontAwesomeIcon icon={faPlay}/>}
          </button>
          <button><FontAwesomeIcon icon={faFastForward} /></button>
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
            /> : null
          }
          <FontAwesomeIcon icon={faList} onClick={togglePlaylist}/>
        </div>
        <div className='close' onClick={handleCloseFloat}>&#x2715;</div>
      </div>
    </div>
  )
}

export default ExpandFloat
