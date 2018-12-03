import React, { Component } from 'react'

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
    const { player } = this.props;
    if(this.props !== nextProps) {
      if(player !== nextProps.player && player !== null ){
        player.song.audio.pause();
        player.song.audio.currentTime = 0;
      }
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
    song.audio.play();
    song.audio.addEventListener('timeupdate', this.seekBarTimeUpdate);
  }

  handlePlay = () => {
    const { play, playing } = this.state;
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
      if(playlist !== null && playlist.length > 1 && playlist.length-1 > nowSong) {
        let nextSong = playlist[nowSong+1];
        playlistAutoNext(nextSong, nowSong+1);
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
    const { player, auth, playlist, startPlaylist, playSongInPlaylist } = this.props;
    if(this.state.expand) {
      return (
        <div className='fab-music expand'>
          <ExpandFloat
            player={player} playing={playing} playlist={playlist}
            show_playlist={show_playlist} auth={auth}
            handlePlay={this.handlePlay}
            handleCloseFloat={this.handleCloseFloat}
            togglePlaylist={this.togglePlaylist}
            startPlaylist={startPlaylist}
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

export default FloatMusic
