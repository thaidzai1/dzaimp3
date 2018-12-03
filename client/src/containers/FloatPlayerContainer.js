import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getUserPlaylist } from '../actions/playlistActions'
import { startPlaylist, playlistAutoNext } from '../actions/playerActions'
import { FloatMusic } from '../components'

class FloatPlayerContainer extends Component {
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
      return true;
    }
    return false;
  }
  render() {
    const {
      player, auth, playlist,
      startPlaylist, playlistAutoNext
    } = this.props;

    return (
      <FloatMusic player={player} auth={auth} playlist={playlist}
        startPlaylist={startPlaylist}
        playlistAutoNext={playlistAutoNext}
      />
    )
  }
}

const mapStateToProps = ({ player, auth, playlist }) => ({ player, auth, playlist });

export default connect(mapStateToProps,
   {
     getUserPlaylist,
     startPlaylist,
     playlistAutoNext
   }
 )(FloatPlayerContainer)
