import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getNewSongs } from '../actions/songActions'
import { getNewAlbums, getAlbumSongs } from '../actions/albumActions'
import { addSongToPlaylist, removeSongFromPlaylist } from '../actions/playlistActions'
import { getSongAudio, startPlaylist } from '../actions/playerActions'
import { HomePage } from '../components'

class HomePageContainer extends Component {
  componentDidMount() {
    this.props.getNewSongs();
    this.props.getNewAlbums();
  }

  render() {
    const { song, album, playlist, auth, addSongToPlaylist, removeSongFromPlaylist, getSongAudio, getAlbumSongs, startPlaylist} = this.props;

    return (
      <HomePage
        newSong={song.newSong}
        playlist={playlist}
        auth={auth}
        addSongToPlaylist={addSongToPlaylist}
        removeSongFromPlaylist={removeSongFromPlaylist}
        newAlbums={album.newAlbums}
        getSongAudio={getSongAudio}
        getAlbumSongs={getAlbumSongs}
        startPlaylist={startPlaylist}
      />
    )
  }
}

const mapStateToProps = ({ song, playlist, auth, album }) => ({ song, playlist, auth, album });

export default connect(mapStateToProps,
  {
    getNewSongs,
    addSongToPlaylist,
    removeSongFromPlaylist,
    getNewAlbums,
    getSongAudio,
    getAlbumSongs,
    startPlaylist
  }
)(HomePageContainer)
