import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { BoxMusic } from '../MusicItem'

const NewSongItem = props => {
  const BoxMusicProps = {...props, item: props.song, Play: props.getSongAudio};
  return (
    <div className='new-song-item'>
      <BoxMusic {...BoxMusicProps}/>
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
