import React, { Component } from 'react'

import NavBarContainer from './NavBar'
import { FloatMusic } from '../components'

class MainPage extends Component {
  render() {
    return (
      <div className='main-page'>
        <NavBarContainer />
        <FloatMusic />
      </div>
    )
  }
}

export default MainPage
