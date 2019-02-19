import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faFolderPlus, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import './index.scss'

const BarMusic = ({ index, item, Play, AddToPlaylist }) => {
  const handlePlaySong = async e => {
    let play = e.currentTarget;
    let loading = e.currentTarget.nextSibling;

    loading.style.display = 'block';
    play.style.display = 'none';

    let afterStartSong = await Play(index);
    if(afterStartSong) {
      loading.style.display = 'none';
      play.style.display = 'block';
    }
  }

  if(item.songName !== undefined) {
    item = {...item, name: item.songName}
  }

  
  let barMusicClass = ['bar-music'];
  if(index % 2 === 0) {
    barMusicClass.push('bar-music-light');
  }
  
  return (
    <div className={barMusicClass.join(' ')}>
      <img src={`/image/poster/${item.poster}`} className='music-img'/>
      <p className='song-info'>{item.name} - <span>{item.singer.name}</span></p>
      <div className='options'>
        <FontAwesomeIcon icon={faHeart} className='btn-heart'/>
        <FontAwesomeIcon icon={faPlay} className='btn-play' onClick={handlePlaySong}/>
        <span className='song-loading'></span>
        <FontAwesomeIcon icon={faFolderPlus} className='btn-addlist' onClick={() => AddToPlaylist(item._id)}/>
      </div>
    </div>
  )
}

BarMusic.propTypes = {
  item: PropTypes.object.isRequired,
  Play: PropTypes.func.isRequired
}

export default BarMusic
