import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faFastForward, faFastBackward, faList } from '@fortawesome/free-solid-svg-icons'

import './index.scss'

class FloatMusic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expand: false,
      play: true,
      playing: true,
    }
    this.floatmusic = React.createRef();
  }

  componentDidMount() {
    this.floatmusic.current.onclick = this.handleFloatMusicClick;
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
    const { song } = this.props.player;
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
    const { song } = this.props.player;
    const { playing, play } = this.state;
    let fillBar = document.getElementById('fill-bar');
    let position = song.audio.currentTime / song.audio.duration;
    if(fillBar){
      fillBar.style.width = position * 100 + '%';
    }
    if(position === 1) {
      this.setState({playing: false, play: false})
    }
    else if( position < 1 && playing === false && play === false){
      this.setState({playing: true, play: true});
    }
  }

  renderFloatStyle = () => {
    const { playing } = this.state;
    const { player } = this.props;
    if(this.state.expand) {
      return (
        <div className='fab-music expand'>
          <div className='song-details'>
            <div className='song-image'></div>
            <h2>{player !== null ? player.song.songName : "This is song's name"}</h2>
          </div>
          <div className='options'>
            <div className='buttons'>
              <button><FontAwesomeIcon icon={faFastBackward} /></button>
              <button
                onClick={this.handlePlay}>
                {playing ? <FontAwesomeIcon icon={faPause}/> : <FontAwesomeIcon icon={faPlay}/>}
              </button>
              <button><FontAwesomeIcon icon={faFastForward} /></button>
            </div>
            <div className='seek-bar'>
              <div className='fill' id='fill-bar'></div>
              <div className='handle'></div>
            </div>
            <div className='playlist'>
              <FontAwesomeIcon icon={faList}/>
            </div>
            <div className='close'
              onClick={this.handleCloseFloat}
            >&#x2715;</div>
          </div>
        </div>
      )
    }
    return <div className='fab-music' ref={this.fabMusic}><img src='/image/floatmusic.svg' /></div>
  }

  render() {
    const { player } = this.props;
    if(player !== null) {
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
