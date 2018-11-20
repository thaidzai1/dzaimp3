import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faFastForward, faFastBackward } from '@fortawesome/free-solid-svg-icons'

const ExpandFloat = props => {
  const { player, playing, handlePlayPause, handleCloseFloat } = props;

  const handlePlay = () => {
    handlePlayPause();
  }

  const handleMinimizeFloat = () => {
    handleCloseFloat();
  }

  return (
    <div className='fab-music expand'>
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
        <div className='close' onClick={handleMinimizeFloat}>&#x2715;</div>
      </div>
    </div>
  )
}

export default ExpandFloat
