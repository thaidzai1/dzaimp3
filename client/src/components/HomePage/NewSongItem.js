import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Item from './Item'
import { BoxMusic } from '../MusicItem'

const NewSongItem = ({ song, playlist, auth, addToPlaylist }) => {

  return (
    <div className='new-song-item'>
      <BoxMusic item={song} playlist={playlist} auth={auth} addToPlaylist={addToPlaylist}/>
    </div>
  )
}

NewSongItem.propTypes = {
  song: PropTypes.object.isRequired,
  playlist: PropTypes.object,
  auth: PropTypes.object,
  addToPlaylist: PropTypes.func.isRequired
}

export default NewSongItem
