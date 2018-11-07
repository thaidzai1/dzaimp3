import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMusic } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'

const NewSongItem = props => {
  const { song } = props;
  return (
    <div className='item'>
      <Link to={`/song/${song.songName}/${song._id}`}>
        <div className='poster' style={{backgroundImage: `url(/image/poster/${song.poster})`}}>
          <FontAwesomeIcon icon={faPlayCircle} className='play-icon'/>
        </div>
        <div className='describe'>
          <h3><span><FontAwesomeIcon icon={faMusic}/></span> {song.songName}</h3>
        </div>
        <div className='invi-desc'>
          <h3><span><FontAwesomeIcon icon={faMicrophone}/></span> {song.singer}</h3>
        </div>
      </Link>
    </div>
  )
}

export default NewSongItem
