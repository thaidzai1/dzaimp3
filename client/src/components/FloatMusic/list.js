import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faPlayCircle } from '@fortawesome/free-solid-svg-icons'

import ListItem from './ListItem'
import SongItem from './SongItem'

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open_list: null,
      list_songs: []
    }
  }

  showSongs = songs => {
    console.log(songs);
    this.setState({
      open_list: true,
      list_songs: songs
    })
  }

  backToPlaylist = () => {
    this.setState({
      open_list: null
    })
  }

  render() {
    const { open_list, list_songs } = this.state;
    const { playlist, startPlaylist} = this.props;

    if(open_list === null ) {
      return (
        <div className='list'>
          {
            playlist ?
              playlist.list.map(
                (list, index) =>
                  <ListItem key={index} list={list}
                    showSongs={songs => this.showSongs(songs)}
                  />
              )
              : null
          }
        </div>
      )
    }
    else {
      return (
        <div className='list'>
          <div className='header'>
            <FontAwesomeIcon icon={faChevronLeft} onClick={this.backToPlaylist}/>
            <FontAwesomeIcon icon={faPlayCircle} onClick={() => startPlaylist(list_songs)} className='play-all'/>
          </div>
          {
            list_songs.map(
              (song, index) => <SongItem
                key={index} song={song} songIndex={index}
                startPlaylist={songIndex => startPlaylist(list_songs, songIndex)}
              />
            )
          }
        </div>
      )
    }
  }
}

export default List
