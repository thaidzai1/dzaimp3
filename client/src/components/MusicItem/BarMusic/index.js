import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faFolderPlus, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import './index.scss'

const BarMusic = ({ index, item, Play }) => {
  if(item.songName !== undefined) {
    item = {...item, name: item.songName}
  }

  let barMusicClass = ['bar-music'];
  if(index%2 === 0) {
    barMusicClass.push('bar-music-light');
  }
  
  return (
    <div className={barMusicClass.join(' ')}>
      <img src={`/image/poster/${item.poster}`} className='music-img'/>
      <p className='song-info'>{item.name} <span>{item.singer.name}</span></p>
      <div className='options'>
        <FontAwesomeIcon icon={faHeart} className='btn-heart'/>
        <FontAwesomeIcon icon={faPlay} className='btn-play' onClick={() => Play(index)}/>
        <FontAwesomeIcon icon={faFolderPlus} className='btn-addlist'/>
      </div>
    </div>
  )
}

BarMusic.propTypes = {
  item: PropTypes.object.isRequired,
  Play: PropTypes.func.isRequired
}

export default BarMusic
