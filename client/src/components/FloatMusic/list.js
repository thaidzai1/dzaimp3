import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faPlayCircle, faPlus } from '@fortawesome/free-solid-svg-icons'

import ListItem from './ListItem'
import SongItem from './SongItem'

const CreatePlaylist = ({show, toggle, onCreate, onChange}) => {
  if(!show) {
    return (
      <div className='box-create' onClick={toggle}>
        <FontAwesomeIcon icon={faPlus} />
        <p>Create a new playlist</p>
      </div>
    )
  }
  return (
      <form className='list-option'>
        <input
          type='text' name='list_name' placeholder="Type your playlist's name" autoFocus={true}
          onChange={onChange}
        />
        <div className='list-buttons'>
          <button onClick={onCreate}>Create</button><button onClick={toggle}>&#x2715;</button>
        </div>
      </form>
  )
}

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open_list: null,
      list_songs: [],
      opening_list_id: null,
      active_create: false
    }
  }

  showSongs = (songs, list_id) => {
    this.setState({
      open_list: true,
      list_songs: songs,
      opening_list_id: list_id
    })
  }

  backToPlaylist = () => {
    this.setState({
      open_list: null,
      list_songs: [],
      opening_list_id: null
    })
  }

  toggleCreatePlaylist = () => {
    this.setState({
      active_create: !this.state.active_create
    })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onCreate = e => {
    e.preventDefault();
    this.props.createPlaylist(this.props.auth.user._id, {list_name: this.state.list_name});
    this.toggleCreatePlaylist();
  }

  render() {
    const { open_list, list_songs, opening_list_id, active_create } = this.state;
    const { auth, playlist, startPlaylist, removeSongFromPlaylist, deletePlaylist} = this.props;

    if(open_list === null ) {
      return (
        <div className='list'>
          {
            playlist ?
              playlist.list.map(
                (list, index) =>
                  <ListItem key={index} list={list} auth={auth}
                    showSongs={this.showSongs}
                    deletePlaylist={deletePlaylist}
                  />
              )
              : null
          }
          <CreatePlaylist show={active_create}
            toggle={this.toggleCreatePlaylist}
            onCreate={this.onCreate}
            onChange={this.onChange}
          />
        </div>
      )
    }
    else {
      return (
        <div className='list'>
          <div className='header'>
            <FontAwesomeIcon icon={faChevronLeft} onClick={this.backToPlaylist}/>
            <FontAwesomeIcon icon={faPlayCircle}
              onClick={() => startPlaylist(list_songs, opening_list_id)}
              className='play-all'
            />
          </div>
          {
            list_songs.map(
              (song, index) => <SongItem
                key={index} song={song} songIndex={index} auth={auth} list_id={opening_list_id}
                startPlaylist={songIndex => startPlaylist(list_songs, opening_list_id, songIndex)}
                removeSongFromPlaylist={removeSongFromPlaylist}
              />
            )
          }
        </div>
      )
    }
  }
}

List.propTypes = {
  auth: PropTypes.object,
  playlist: PropTypes.object,
  startPlaylist: PropTypes.func,
  removeSongFromPlaylist: PropTypes.func,
  createPlaylist: PropTypes.func,
  deletePlaylist: PropTypes.func
}

export default List
