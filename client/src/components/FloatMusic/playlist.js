import React from 'react'

import List from './list'

const Playlist = props => {
  return (
    <div className='box-list'>
      {
        props.auth === null ? 'You must login to use this' :
        <List {...props}
        />
      }
    </div>
  )
}

export default Playlist
