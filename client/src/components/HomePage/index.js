import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import NewSongItem from './NewSongItem'
import NewAlbumItem from './NewAlbumItem'
import Modal from '../Modal'
import AddPlaylistModalItem from '../Modal/AddPlaylistModalItem'
import Loader from '../../HOC/Loader'
import './index.scss'

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      add_song_id: null
    }
  }

  addToPlaylist = (song_id=null) => {
    this.setState({
      add_song_id: song_id
    })
  }

  render() {
    const {
      newSong, newAlbums, playThisSong, playlist, auth,
      addSongToPlaylist, removeSongFromPlaylist
    } = this.props;
    const { add_song_id } = this.state;

    return (
      <div className='home-page'>
        <div className='main'>
          <div className='new-song'>
            <div className='title'>
              <h1><span><FontAwesomeIcon icon={faHandPointRight}/></span>New Songs > </h1>
            </div>
            {
              newSong.map((item, index) => {
                return (
                    <NewSongItem song={item} key={index}
                      playlist={playlist} auth={auth}
                      addToPlaylist={this.addToPlaylist}
                    />
                )
              })
            }
            <Modal isOpen={add_song_id ? true : false} toggleModal={this.addToPlaylist}>
              {
                auth && playlist ?
                  playlist.list.map((item, index) =>
                    <AddPlaylistModalItem key={index}
                      playlist={item}
                      user_id={auth.user._id}
                      song_id={add_song_id}
                      addSongToPlaylist={addSongToPlaylist}
                      removeSongFromPlaylist={removeSongFromPlaylist}
                    />
                  )
                  : <p>Login to use playlilst</p>
              }
            </Modal>
          </div>
          <div className='new-song'>
            <div className='title'>
              <h1><span><FontAwesomeIcon icon={faHandPointRight}/></span>New Albums > </h1>
            </div>
            {
              newAlbums.map((item, index) => {
                return (
                  <NewAlbumItem album={item} key={index}/>
                )
              })
            }
          </div>
        </div>
        <div className='hightlight'>
            <img src="/image/keepcalm.jpg" />
            <img src="/image/keepcalmkpop.jpg" />
        </div>
      </div>
    )
  }
}

HomePage.propTypes = {
  newSong: PropTypes.array,
  playlist: PropTypes.object,
  auth: PropTypes.object,
  addSongToPlaylist: PropTypes.func,
  removeSongFromPlaylist: PropTypes.func
}

export default Loader('newSong')(HomePage)
