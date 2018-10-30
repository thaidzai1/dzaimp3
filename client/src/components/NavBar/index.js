import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Slider from './Slider'
import Menu from './Menu'
import Caption from './Caption'
import './index.scss'

class NavBar extends Component {

  render() {
    const { auth } = this.props;

    return (
      <div className='navbar'>
        <Slider />
        <Menu auth={ auth } />
        <Caption />
      </div>
    )
  }
}

export default NavBar
