import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMusic, faInfoCircle, faFolderPlus, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'

import './index.scss'

const BoxMusic = ({item, type='song', addToPlaylist}) => {
  if(item.songName !== undefined) {
    item = {...item, name: item.songName}
  }
  return (
    <div className='item'>
      <Link to={`/${type}/${item.name}/${item._id}`}>
        <div className='poster' style={{backgroundImage: `url(/image/poster/${item.poster})`}}>
          <FontAwesomeIcon icon={faInfoCircle} className='detail-icon'/>
          <FontAwesomeIcon icon={faPlayCircle} className='play-icon'/>
        </div>
        <div className='describe'>
          <h3><span><FontAwesomeIcon icon={faMusic}/></span> {item.name}</h3>
        </div>
      </Link>
      <div className='invi-desc'>
        <h3><span><FontAwesomeIcon icon={faMicrophone}/></span> {item.singer.name}</h3>
        <div className='item-options'>
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
