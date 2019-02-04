import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons'

import { BarMusic } from '../MusicItem'
import Loader from '../../HOC/Loader'
import './index.scss'

const AlbumDetail = ({ album, songs, startPlaylist }) => {
  if(album) {
    return (
      <div className='album-detail'>
        <div className='album-info'>
          <div className='album-pic'>
            <img src={`/image/poster/${album.poster}`} />
            <FontAwesomeIcon icon={faPlayCircle} className='btn-play' onClick={() => startPlaylist(songs, album._id)}/>
          </div>
          <div className='detail'>
            <h1>{album.name}</h1>
            <h2>Singer: {album.singer.name}</h2>
          </div>
        </div>
        <div className='list-song'>
          {
            songs.map((song, index) => 
              <BarMusic 
                key={index} index={index} item={song} 
                Play={index => startPlaylist(songs, album._id, index)}
              />
            )
          }
        </div>
      </div>
    )
  }
  return null;
}

export default Loader('songs')(AlbumDetail)
