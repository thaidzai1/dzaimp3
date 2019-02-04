import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import * as Container from './'
import { Analyser } from '../components'

class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { match, location, analyser } = this.props;

    if(location.pathname === '/login' || location.pathname === '/signup'){
      return null;
    }
    
    return (
      <div className='main-page'>
        <Container.NavBar />
        <Container.FloatPlayer />
        <div className='main-body'>
          <Analyser show={analyser.show}/>
          <Route path={`${match.path}`} exact component={Container.HomePageContainer}/>
          <Route path={`${match.path}song/:name/:id`} component={Container.SongContainer}/>
          <Route path={`${match.path}album/:name/:id`} component={Container.AlbumDetailContainer}/>
          <Route path={`${match.path}album/listen=:id`} component={Container.AlbumListen} />
          <Route path={`${match.path}songs`} component={Container.PageAllContainer} />
          <Route path={`${match.path}playlist/:id-:user_id`} component={Container.Playlist} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ analyser, playlist }) => ({ analyser, playlist });

export default connect(mapStateToProps)(MainPage)
