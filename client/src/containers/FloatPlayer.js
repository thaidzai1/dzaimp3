import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  getUserPlaylist, removeSongFromPlaylist, createPlaylist, deletePlaylist
} from '../actions/playlistActions'
import { startPlaylist, playlistAutoNext, playlistPrevious, updatePlayerPlaylist } from '../actions/playerActions'
import { FloatMusic } from '../components'
import initAnalyser from '../util/initAnalyzer'

class FloatPlayer extends Component {
  componentDidMount() {
    const { auth, playlist, getUserPlaylist } = this.props;
    if(auth !== null && auth.user !== undefined && playlist !== null) {
      getUserPlaylist(auth.user._id);
    }
  }
  shouldComponentUpdate(nextProps) {
    const { auth, playlist, player, getUserPlaylist, updatePlayerPlaylist } = this.props;
    
    //if auth update update component
    if(auth !== nextProps.auth) {
      //get user logged in playlist
      getUserPlaylist(nextProps.auth.user._id);
      return true;
    }

    //check if playlist update
    if(playlist !== nextProps.playlist) {
      //check prepare for update playlist is playing in player.
      if(playlist !== null && player !== null && player.hasOwnProperty('playlist')) {
        //get index of playlist is play in player
        let playlistIndex = playlist.list.indexOf(playlist.list.find(list => list._id === player._id));
        //check if playlist playing in player => yes? update it
        if(playlist.list[playlistIndex] !==  nextProps.playlist.list[playlistIndex]) {
          updatePlayerPlaylist(nextProps.playlist.list[playlistIndex].songs);
        }
      }
      return true;
    }
    
    //if player change => start new song => start Analyser 
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
     playlistPrevious,
     removeSongFromPlaylist,
     updatePlayerPlaylist,
     createPlaylist,
     deletePlaylist
   }
 )(FloatPlayer)
