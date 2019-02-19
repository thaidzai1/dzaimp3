import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { BoxMusic } from '../MusicItem'

const NewAlbumItem = props => {
  const { album, startPlaylist, getAlbumSongs } = props;
  return (
    <div className='new-song-item'>
      <BoxMusic item={album} type='album' Play={startPlaylist} getAlbumSongs={getAlbumSongs} />
    </div>
  )
}

NewAlbumItem.propTypes = {
  album: PropTypes.object.isRequired
}

export default NewAlbumItem
