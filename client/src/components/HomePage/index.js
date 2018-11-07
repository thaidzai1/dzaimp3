import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import NewSongItem from './NewSongItem'
import './index.scss'

class HomePage extends Component {

  render() {
    const { newSong, playThisSong } = this.props;
    return (
      <div className='home-page'>
        <div className='main'>
          <div className='new-song'>
            <div className='title'>
              <h1><span><FontAwesomeIcon icon={faHandPointRight}/></span>New Song > </h1>
            </div>
            {
              newSong.map((item, index) => {
                return (
                    <NewSongItem song={item} key={index}
                    />
                )
              })
            }

          </div>

        </div>
        <div className='hightlight'></div>
      </div>
    )
  }
}

export default HomePage
