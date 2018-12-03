import React, { Component } from 'react'

import './index.scss'

class Song extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    if(this.props.player !== nextProps.player) {
      this.initMp3Player(nextProps.player.song.audio);
    }
    return this.props.player !== nextProps.player;
  }

  initMp3Player = (audio) => {
    var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

    context = new AudioContext(); // AudioContext object instance
    analyser = context.createAnalyser(); // AnalyserNode method
    canvas = document.getElementById('analyser_render');
    ctx = canvas.getContext('2d');
    // Re-route audio playback into the processing graph of the AudioContext
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    frameLooper();
    function frameLooper() {
      window.requestAnimationFrame(frameLooper);
      fbc_array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(fbc_array);
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      ctx.fillStyle = '#14bdf5'; // Color of the bars
      bars = 200;
      for (var i = 0; i < bars; i++) {
        bar_x = i * 3;
        bar_width = 2;
        bar_height = -(fbc_array[i] / 2);
        //  fillRect( x, y, width, height ) // Explanation of the parameters below
        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
      }
    }
  }

  render() {
    const { player } = this.props;
    // if(player !== null){
    //   player.audio.play();
    // }
    console.log(player);
    return (
      <div className='listen-song'>
        <div className='song-box'
          style={{backgroundImage: `url('/image/song/${player ? player.song.song_image : ''}')`}}
        >
          <canvas id='analyser_render'></canvas>
        </div>
      </div>
    )
  }
}

export default Song
