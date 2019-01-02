import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { BoxMusic } from '../MusicItem'

class NewAlbumItem extends Component {

  shouldComponentUpdate(nextProps) {
    return this.props.auth !== nextProps.auth;
  }

  render() {
    const { album } = this.props;
    return (
      <div className='new-song-item'>
        <BoxMusic item={album} type='album' />
      </div>
    )
  }
}

NewAlbumItem.propTypes = {
  album: PropTypes.object.isRequired
}

export default NewAlbumItem
