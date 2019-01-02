import React from 'react'
import PropTypes from 'prop-types'

const SongItem = ({songIndex, song, auth, list_id, startPlaylist, removeSongFromPlaylist}) => {

  return (
    <div className='song-item'>
      <div className='song-info' onClick={() => startPlaylist(songIndex)}>
        <div className='poster' style={{backgroundImage: `url('/image/poster/${song.poster}')`}}></div>
        <div className='info'>
          {song.singer ? `${song.songName}-${song.singer.name}` : ''}
        </div>
      </div>
      <div className='remove'
        onClick={() => removeSongFromPlaylist(auth.user._id, list_id, song._id)}
      >
        &#x2715;
      </div>
    </div>
  )
}

SongItem.propTypes = {
  song: PropTypes.object,
  songIndex: PropTypes.number,
  auth: PropTypes.object,
  list_id: PropTypes.string,
  startPlaylist: PropTypes.func,
  removeSongFromPlaylist: PropTypes.func
}

export default SongItem
