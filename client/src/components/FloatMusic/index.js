import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ExpandFloat from './expand'
import './index.scss'

class FloatMusic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expand: false,
      play: true,
      playing: true,
      show_playlist: false
    }
    this.floatmusic = React.createRef();
  }

  componentDidMount() {
    this.floatmusic.current.onclick = this.handleFloatMusicClick;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { player, playlist, updatePlayerPlaylist } = this.props;

    if(this.props !== nextProps) {
      if(player !== nextProps.player && player !== null ){
        player.song.audio.pause();
        player.song.audio.currentTime = 0;
        this.setState({ play: true, playing: true});
      }
      // if(playlist !== nextProps.playlist && playlist !== null && player !== null && player.hasOwnProperty('playlist')){
      //   updatePlayerPlaylist(playlist.list[1].songs);
      // }
      return true;
    }

    if(this.state !== nextState){
      return true;
    }
  }

  handleFloatMusicClick = () => {
    this.setState({
      expand: true
    })
  }

  handleCloseFloat = () => {
    this.setState({
      expand: false
    })
  }

  startASong = () => {
    const { song, playlist } = this.props.player;
    song.audio.muted = false;
    song.audio.play();
    song.audio.addEventListener('timeupdate', this.seekBarTimeUpdate);
  }

  handlePlay = () => {
    const { playing } = this.state;
    const { song } = this.props.player;

    if(playing){
      song.audio.pause();
      this.setState({playing: false})
    }
    else {
      song.audio.play();
      this.setState({playing: true})
    }
  }

  seekBarTimeUpdate = () => {
    const { song, playlist, nowSong } = this.props.player;
    const { playlistAutoNext } = this.props;
    const { playing, play } = this.state;
    let fillBar = document.getElementById('fill-bar');
    let position = song.audio.currentTime / song.audio.duration;
    if(fillBar){
      fillBar.style.width = position * 100 + '%';
    }
    if(position === 1) {
      if(playlist !== null && playlist[playlist.length-1]._id !== song._id) {
        playlistAutoNext();
      }
      else {
        this.setState({playing: false, play: false})
      }
    }
    else if( position < 1 && playing === false && play === false){
      this.setState({playing: true, play: true});
    }
  }

  togglePlaylist = () => {
    this.setState({show_playlist: !this.state.show_playlist});
  }

  renderFloatStyle = () => {
    const { playing, show_playlist } = this.state;
    if(this.state.expand) {
      return (
        <div className='fab-music expand'>
          <ExpandFloat
            {...this.props}
            {...this.state}
            handlePlay={this.handlePlay}
            handleCloseFloat={this.handleCloseFloat}
            togglePlaylist={this.togglePlaylist}
          />
        </div>
      )
    }
    return <div className='fab-music' ref={this.fabMusic}><img src='/image/floatmusic.svg' /></div>
  }

  render() {
    const { player } = this.props;
    const { play, playing } = this.state;

    if(player !== null && playing !== false) {
      this.startASong();
    }
    return (
      <div className='float-music' ref={this.floatmusic}>
        {this.renderFloatStyle()}
      </div>
    )
  }
}

FloatMusic.propTypes = {
  player: PropTypes.object,
  auth: PropTypes.object,
  playlist: PropTypes.object,
  startPlaylist: PropTypes.func,
  playlistAutoNext: PropTypes.func,
  removeSongFromPlaylist: PropTypes.func,
  updatePlayerPlaylist: PropTypes.func,
  createPlaylist: PropTypes.func,
  deletePlaylist: PropTypes.func
}

export default FloatMusic
