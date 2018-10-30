import React, { Component } from 'react'

import './index.scss'

class FloatMusic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expand: true,
      list_song: ['Latata', 'Hann', 'WHISTLE'],
      current_song_name: null,
      current_song_id: null,
      play: false,
      playing: false,
      playingSong: null
    }
    this.floatmusic = React.createRef();
    this.closeFloating = React.createRef();
  }

  componentDidMount() {
    this.floatmusic.current.onclick = this.handleFloatMusicClick;
  }

  handleFloatMusicClick = e => {
    console.log(this.closeFloating.current);
    if(this.closeFloating.current != null) {
      if(e.target.contains(this.closeFloating.current)){
        console.log('close');
        this.setState({
          expand: false
        })
      }
    }
    else {
      console.log('nothing');
      this.setState({
        expand: true
      })
    }
  }

  startASong = (song_id) => {
    const { list_song } = this.state;
    let song = new Audio();
    song.src = `/audio/${list_song[song_id]}.mp3`;
    this.setState({playingSong: song, current_song_name: list_song[song_id], current_song_id: song_id});
    song.play();
    song.addEventListener('timeupdate', this.seekBarTimeUpdate);
  }

  handlePlay = () => {
    const { play, playing, playingSong } = this.state;
    if(!play){
      this.setState({play: true, playing: true});
      this.startASong(0);
    }
    else {
      if(playing){
        playingSong.pause();
        this.setState({playing: false})
      }
      else {
        playingSong.play();
        this.setState({playing: true})
      }
    }
  }

  seekBarTimeUpdate = () => {
    const { playingSong, current_song_id, list_song } = this.state;
    let fillBar = document.getElementById('fill-bar');
    let position = playingSong.currentTime / playingSong.duration;
    if(fillBar){
      fillBar.style.width = position * 100 + '%';
    }
    if(position === 1) {
      if(current_song_id + 1 < list_song.length){
        this.startASong(current_song_id + 1);
      }
      else {
        this.setState({playing: false, play: false})
      }
    }
  }

  renderFloatStyle = () => {
    const { current_song_name, playing } = this.state;
    if(this.state.expand) {
      return (
        <div className='fab-music expand'>
          <div className='song-details'>
            <div className='song-image'></div>
            <h2>{current_song_name !== null ? current_song_name : "This is song's name"}</h2>
          </div>
          <div className='options'>
            <div className='buttons'>
              <button><img src='/image/previous.svg' /></button>
              <button onClick={this.handlePlay}>
                <img src={playing ? '/image/pause.svg' : '/image/play.svg'}/>
              </button>
              <button><img src='/image/next.svg' /></button>
            </div>
            <div className='seek-bar'>
              <div className='fill' id='fill-bar'></div>
              <div className='handle'></div>
            </div>
            <div className='close' ref={this.closeFloating}>&#x2715;</div>
          </div>
        </div>
        )
    }
    return <div className='fab-music' ref={this.fabMusic}><img src='/image/floatmusic.svg' /></div>
  }

  render() {
    return (
      <div className='float-music' ref={this.floatmusic}>
        {this.renderFloatStyle()}
      </div>
    )
  }
}

export default FloatMusic
