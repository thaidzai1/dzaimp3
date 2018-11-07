import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getNewSongs } from '../actions/songActions'
import { HomePage } from '../components'

class HomePageContainer extends Component {

  componentDidMount() {
    this.props.getNewSongs();
  }

  render() {
    const { song } = this.props;
    return (
      <HomePage
        newSong={song.newSong}
      />
    )
  }
}

const mapStateToProps = ({ song }) => ({ song });

export default connect(mapStateToProps, { getNewSongs })(HomePageContainer)
