import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getSongAudio } from '../actions/playerActions'
import { Song } from '../components'

class SongContainer extends Component {
  componentDidMount() {
    const { player, match } = this.props;
    if(player !== null){
      player.song.audio.pause();
      player.song.audio.currentTime = 0;
    }
    console.log('didmout');
    this.props.getSongAudio(match.params.id);
  }

  render() {
    const { match, player } = this.props;
    console.log(this.props);
    return (
      <Song player={player} />
    )
  }
}

const mapStateToProps = ({ player }) => ({ player });

export default connect(mapStateToProps, { getSongAudio })(SongContainer)
