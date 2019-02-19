import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMusic, faInfoCircle, faFolderPlus, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'

import './index.scss'

const BoxMusic = ({item, type='song', addToPlaylist, Play, getAlbumSongs}) => {
  const handleClickPlay = async e => {
    let loading = e.currentTarget.nextSibling;
    let boxMusic = e.currentTarget.parentNode.parentNode;

    loading.style.display = 'block';

    boxMusic.classList.remove('box-music-hover');

    let afterGetSong
    if(type === 'song') {
      afterGetSong = await Play(item._id); //true or false
    }
    else {
      let albumSongs = await getAlbumSongs(item._id);
      afterGetSong = await Play(albumSongs, item._id);
    }
    if(afterGetSong) {
      boxMusic.classList.add('box-music-hover');
      loading.style.display = 'none';
    }
  }

  if(item.songName !== undefined) {
    item = {...item, name: item.songName}
  }

  return (
    <div className='box-music box-music-hover'>
      <div className='poster'>
        <img src={`/image/poster/${item.poster}`} />
        <FontAwesomeIcon icon={faInfoCircle} className='detail-icon'/>
        <FontAwesomeIcon icon={faPlayCircle} className='play-icon' onClick={handleClickPlay}/>
        {/* song-loading must put after the play-icon for nextSibling method */}
        <span className='song-loading'></span>
      </div>
      <div className='describe'>
        <Link to={`/${type}/${item.name}/${item._id}`}>
          <h3><span><FontAwesomeIcon icon={faMusic}/></span> {item.name}</h3>
        </Link>
        <h3><span><FontAwesomeIcon icon={faMicrophone}/></span> {item.singer.name}</h3>
      </div>
      <div className='invi-desc'>
        <div className='box-music-options'>
          {
            type === 'song' ? <FontAwesomeIcon icon={faFolderPlus} className='add-playlist'
              onClick={() => addToPlaylist(item._id)}
            /> : null
          }
          <FontAwesomeIcon icon={faHeart} className='heart'/>
        </div>
      </div>
    </div>
  )
}

BoxMusic.propTypes = {
  item: PropTypes.object.isRequired
}

export default BoxMusic
