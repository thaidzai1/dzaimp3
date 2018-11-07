import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import { FloatMusic, Song } from '../components'

class Mp3Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playingSong: '/audio/Hann.mp3',
      playingAudio: null
    }
  }

  componentDidMount() {
    const { playingSong } = this.state;
    let audio = new Audio();
    audio.src = playingSong;
    this.setState({
      playingAudio: audio
    })
  }

  render() {
    const { match } = this.props;
    const { playingAudio } = this.state;
    return (
      <div>
        <FloatMusic audio={playingAudio} />
        <Route
          path={`${match.path}song/:id`}
          render={ props => <Song {...props} audio={playingAudio}/> }
        />
      </div>
    )
  }
}

export default Mp3Container
