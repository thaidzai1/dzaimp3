import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getSongAudio, startPlaylist } from '../actions/playerActions'
import { hideShowAnalyser } from '../actions/analyserActions'
import { Song } from '../components'

class SongContainer extends Component {

  componentWillMount() {
    console.log('will')
    window.scrollTo(0, 0);
  }
  
  componentDidMount() {
    const { player, match, getSongAudio, hideShowAnalyser } = this.props;
    if(player !== null){
      if(player.song._id !== match.params.id) {
        player.song.audio.pause();
        player.song.audio.currentTime = 0;
        getSongAudio(match.params.id);
      }
    }
    else {
      getSongAudio(match.params.id);
    }
    hideShowAnalyser(true);
  }

  componentWillUnmount() {
    this.props.hideShowAnalyser(false);
  }

  render() {
    const { player, startPlaylist } = this.props;

    return (
      <Song player={player} startPlaylist={startPlaylist}/>
    )
  }
}

const mapStateToProps = ({ player }) => ({ player });

export default connect(mapStateToProps,
  { 
    getSongAudio, 
    hideShowAnalyser,
    startPlaylist
  }
)(SongContainer)
