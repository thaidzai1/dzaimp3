import React from 'react'

import List from './list'

const Playlist = ({auth, playlist, startPlaylist, playSongInPlaylist}) => {
  return (
    <div className='box-list'>
      {
        auth === null ? 'You must login to use this' :
        <List playlist={playlist}
          startPlaylist={startPlaylist}
        />
      }
    </div>
  )
}

export default Playlist
