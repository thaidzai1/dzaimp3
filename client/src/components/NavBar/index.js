import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Slider from './Slider'
import Menu from './Menu'
import Caption from './Caption'
import './index.scss'

const NavBar = (props) => {
  return (
    <div className='navbar'>
      <Slider />
      <Menu {...props} />
      <Caption />
    </div>
  )
}

export default NavBar
