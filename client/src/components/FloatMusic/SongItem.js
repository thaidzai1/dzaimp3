import React from 'react'

const SongItem = ({songIndex, song, startPlaylist}) => {
  return (
    <div className='song-item' onClick={() => startPlaylist(songIndex)}>
      <div className='song-info'>
        <div className='poster' style={{backgroundImage: `url('/image/poster/${song.poster}')`}}></div>
        <div className='info'>
          {`${song.songName}-${song.singer}`}
        </div>
      </div>
    </div>
  )
}

export default SongItem
