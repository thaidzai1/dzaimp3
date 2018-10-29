import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Slider from './slider'
import Menu from './Menu'
import './index.scss'

class NavBar extends Component {

  render() {
    return (
      <div className='navbar'>
        <Slider />
        <Menu />
        <div className='caption'>
          <h1>Welcome to DzaiMp3</h1>
          <h2>Various types of music</h2>
          <div className='caption-slide'>
            <b>
              <span>
                Electronice Dance Music
                <br/>
                Us-Uk Pop Music
                <br/>
                Country Music
                <br/>
                Kpop Music
              </span>
            </b>
            <div style={{clear: 'both'}}></div>
          </div>
        </div>
      </div>
    )
  }
}

export default NavBar
