import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMusic, faInfoCircle, faFolderPlus, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'

import Modal from '../Modal'

const NewSongItem = ({song, playlist, auth, toggleModelPlaylist}) => {

  return (
    <div className='new-song-item'>
      <div className='item'>
        <Link to={`/song/${song.songName}/${song._id}`}>
          <div className='poster' style={{backgroundImage: `url(/image/poster/${song.poster})`}}>
            <FontAwesomeIcon icon={faInfoCircle} className='detail-icon'/>
            <FontAwesomeIcon icon={faPlayCircle} className='play-icon'/>
          </div>
          <div className='describe'>
            <h3><span><FontAwesomeIcon icon={faMusic}/></span> {song.songName}</h3>
          </div>
        </Link>
        <div className='invi-desc'>
          <h3><span><FontAwesomeIcon icon={faMicrophone}/></span> {song.singer}</h3>
          <div className='item-options'>
            <FontAwesomeIcon icon={faFolderPlus} className='add-playlist'
              onClick={toggleModelPlaylist}
            />
            <FontAwesomeIcon icon={faHeart} className='heart'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewSongItem
