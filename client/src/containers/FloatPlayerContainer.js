import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getSongAudio } from '../actions/playerActions'
import { FloatMusic } from '../components'

class FloatPlayerContainer extends Component {
  render() {
    const { player } = this.props;
    return (
      <FloatMusic player={player}/>
    )
  }
}

const mapStateToProps = ({ player }) => ({ player });

export default connect(mapStateToProps, { getSongAudio })(FloatPlayerContainer)
