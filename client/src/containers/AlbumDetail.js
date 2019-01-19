import React, { Component } from 'react'
import { connect } from 'react-redux'

import { AlbumDetail } from '../components'
import Loader from '../HOC/Loader'
import { getAlbumDetail, getAlbumSongs } from '../actions/albumActions'
import { startPlaylist } from '../actions/playerActions'

class AlbumDetailContainer extends Component {
  componentDidMount() {
    const { match: {params: { id }}} = this.props;
    this.props.getAlbumDetail(id);
    this.props.getAlbumSongs(id);
  }

  render() {
    const { detail, songs } = this.props.album;
    const { startPlaylist } = this.props;
    
    return (
      <AlbumDetail album={detail} songs={songs} startPlaylist={startPlaylist}/>
    )
  }
}

const mapStateToProps = ({ album }) => ({ album });

export default connect(mapStateToProps, 
  { 
    getAlbumDetail, 
    getAlbumSongs, 
    startPlaylist 
  }
)(AlbumDetailContainer)
