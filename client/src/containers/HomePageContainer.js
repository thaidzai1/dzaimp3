import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getNewSongs } from '../actions/songActions'
import { HomePage } from '../components'

class HomePageContainer extends Component {
  componentDidMount() {
    this.props.getNewSongs();
  }

  render() {
    const { song, playlist, auth } = this.props;
    
    return (
      <HomePage
        newSong={song.newSong}
        playlist={playlist}
        auth={auth}
      />
    )
  }
}

const mapStateToProps = ({ song, playlist, auth }) => ({ song, playlist, auth });

export default connect(mapStateToProps, { getNewSongs })(HomePageContainer)
