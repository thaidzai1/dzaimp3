import React, { Component } from 'react'
import { connect } from 'react-redux'

import { AlbumDetail } from '../components'
import Loader from '../HOC/Loader'
import { getAlbumDetail, getAlbumSongs } from '../actions/albumActions'
import { startPlaylist } from '../actions/playerActions'
import { uiAddSongToPlaylist } from '../actions/uiActions'
import { addSongToPlaylist, removeSongFromPlaylist } from '../actions/playlistActions'

class AlbumDetailContainer extends Component {
  componentDidMount() {
    const { match: {params: { id }}} = this.props;
    this.props.getAlbumDetail(id);
    this.props.getAlbumSongs(id);
  }

  render() {
    const { detail, songs } = this.props.album;
    const { startPlaylist, album } = this.props;

    let albumDetailProps = {...this.props, detail: album.detail, songs}
    console.log(this.props.album, albumDetailProps)
    return (
      <AlbumDetail {...albumDetailProps}/>
    )
  }
}

const mapStateToProps = ({ album, UI, auth, playlist }) => ({ album, UI, auth, playlist });

export default connect(mapStateToProps, 
  { 
    getAlbumDetail, 
    getAlbumSongs, 
    startPlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    uiAddSongToPlaylist
  }
)(AlbumDetailContainer)
