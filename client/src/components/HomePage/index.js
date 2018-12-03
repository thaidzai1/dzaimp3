import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import NewSongItem from './NewSongItem'
import Modal from '../Modal'
import AddPlaylistModalItem from './AddPlaylistModalItem'
import './index.scss'

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open_modal_playlist: false
    }
  }

  toggleModelPlaylist = () => {
    this.setState({
      open_modal_playlist: !this.state.open_modal_playlist
    })
  }

  render() {
    const { newSong, playThisSong, playlist, auth } = this.props;
    const { open_modal_playlist } = this.state;

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
                      playlist={playlist} auth={auth}
                      toggleModelPlaylist={this.toggleModelPlaylist}
                    />
                )
              })
            }
            <Modal isOpen={open_modal_playlist} toggleModal={this.toggleModelPlaylist}>
              {
                auth && playlist ?
                  playlist.list.map((item, index) =>
                    <AddPlaylistModalItem key={index} 
                      playlist={item}
                    />
                  )
                  : <p>Login to use playlilst</p>
              }
            </Modal>
          </div>

        </div>
        <div className='hightlight'></div>
      </div>
    )
  }
}

export default HomePage
