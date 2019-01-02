import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  getUserPlaylist, removeSongFromPlaylist, createPlaylist, deletePlaylist
} from '../actions/playlistActions'
import { startPlaylist, playlistAutoNext, updatePlayerPlaylist } from '../actions/playerActions'
import { FloatMusic } from '../components'
import initAnalyser from '../util/initAnalyzer'

class FloatPlayer extends Component {
  componentDidMount() {
    const { auth, getUserPlaylist } = this.props;
    if(auth !== null && auth.user !== undefined) {
      getUserPlaylist(auth.user._id);
    }
  }
  shouldComponentUpdate(nextProps) {
    const { auth, playlist, player, getUserPlaylist } = this.props;
    if(auth !== nextProps.auth) {
      getUserPlaylist(nextProps.auth.user._id);
      return true;
    }
    if(playlist !== nextProps.playlist) {
      return true;
    }
    if(player !== nextProps.player){
      initAnalyser(nextProps.player.song.audio);
      return true;
    }
    return false;
  }
  render() {
    const {
      player, auth, playlist,
      startPlaylist, playlistAutoNext, removeSongFromPlaylist
    } = this.props;

    return (
      <FloatMusic {...this.props}/>
    )
  }
}

const mapStateToProps = ({ player, auth, playlist }) => ({ player, auth, playlist });

export default connect(mapStateToProps,
   {
     getUserPlaylist,
     startPlaylist,
     playlistAutoNext,
     removeSongFromPlaylist,
     updatePlayerPlaylist,
     createPlaylist,
     deletePlaylist
   }
 )(FloatPlayer)
