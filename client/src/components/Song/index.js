import React, { Component } from 'react'
import PropTypes from 'prop-types'

import initAnalyzer from '../../util/initAnalyzer'
import './index.scss'

class Song extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { player } = this.props;
    if( player != null) {
      return (
        <div className='listen-song'>
          <div className='song-box'
            style={{backgroundImage: `url('/image/song/${player.song.song_image }`}}
          >
            <div className='song-info'>
              <h1>{player.song.songName}</h1>
              <h3><span>Singer: </span><span className='name'>{player.song.singer.name}</span></h3>
              <h3><span>Album: </span><span className='name'>{player.song.album.name}</span></h3>
            </div>
          </div>
        </div>
      )
    }
    return null;
  }
}

Song.propTypes = {
  player: PropTypes.object
}

export default Song
