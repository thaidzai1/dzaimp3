import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import NavBarContainer from './NavBar'
import FloatPlayerContainer from './FloatPlayerContainer'
import SongContainer from './SongContainer'
import HomePageContainer from './HomePageContainer'

class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { match, location } = this.props;
    console.log(this.props);
    if(location.pathname === '/login' || location.pathname === '/signup'){
      return null;
    }
    return (
      <div className='main-page'>
        <NavBarContainer />
        <FloatPlayerContainer />
        <Route path={`${match.path}`} exact component={HomePageContainer}/>
        <Route path={`${match.path}song/:name/:id`} component={SongContainer}/>
      </div>
    )
  }
}

export default MainPage
