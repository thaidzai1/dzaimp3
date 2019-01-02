import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Item from './Item'
import { BoxMusic } from '../MusicItem'

class NewSongItem extends Component {

  shouldComponentUpdate(nextProps) {
    return this.props.auth !== nextProps.auth;
  }

  render() {
    const { song, playlist, auth, addToPlaylist } = this.props;
    return (
      <div className='new-song-item'>
        <BoxMusic item={song} playlist={playlist} auth={auth} addToPlaylist={addToPlaylist}/>
      </div>
    )
  }
}

NewSongItem.propTypes = {
  song: PropTypes.object.isRequired,
  playlist: PropTypes.object,
  auth: PropTypes.object,
  addToPlaylist: PropTypes.func.isRequired
}

export default NewSongItem
