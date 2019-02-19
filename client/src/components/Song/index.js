import React, { Component } from 'react'
import PropTypes from 'prop-types'

import initAnalyzer from '../../util/initAnalyzer'
import BarMusic from '../MusicItem/BarMusic'
import './index.scss'

class Song extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.responsiveAnalyserOnWindowResize();
    this.setAnalyserWidth();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.responsiveAnalyserOnWindowResize.handleWindowResize);
  }

  setAnalyserWidth() {
    let songBox = document.querySelector("#listen-song").offsetWidth;
    document.querySelector("#analyser_render").style.width = `${songBox}px`;
  }

  responsiveAnalyserOnWindowResize() {
    let songBox = document.querySelector("#listen-song");
    let analyser = document.querySelector("#analyser_render");
    window.addEventListener("resize", handleWindowResize);

    function handleWindowResize() {
      analyser.style.width = `${songBox.offsetWidth}px`;
    }
  }

  renderListSong = () => {
    if(this.props.player !== null) {
      const { player: {playlist, _id, user_list}, startPlaylist } = this.props;
      if(playlist !== null ) {
        return playlist.map((song, index) => 
          <BarMusic 
            key={index} item={song} index={index} Play={songIndex => startPlaylist(playlist, _id, songIndex, user_list)} 
          />
        )
      }
      return null;
    }
  }

  renderSongBox = () => {
    const { player } = this.props;

    if(player !== null) {
      return (
        <div className='song-box'
          style={{backgroundImage: `url('/image/song/${player.song.song_image }`}}
        >
          <div className='song-info'>
            <h1>{player.song.songName}</h1>
            <h3><span>Singer: </span><span className='name'>{player.song.singer.name}</span></h3>
            <h3><span>Album: </span><span className='name'>{player.song.album.name}</span></h3>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='listen-song' id='listen-song'>
        {this.renderSongBox()}
        <div className='list-box'>
          {this.renderListSong()}
        </div>
      </div>
    )
  }
}

Song.propTypes = {
  player: PropTypes.object
}

export default Song
