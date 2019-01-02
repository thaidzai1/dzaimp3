import React, { Component } from 'react'
import { connect } from 'react-redux'

import { AlbumDetail } from '../components'
import Loader from '../HOC/Loader'
import { getAlbumDetail, getAlbumSongs } from '../actions/albumActions'

class AlbumDetailContainer extends Component {
  componentDidMount() {
    const { match: {params: { id }}} = this.props;
    this.props.getAlbumDetail(id);
    this.props.getAlbumSongs(id);
  }

  render() {
    const { detail, songs } = this.props.album;
    return (
      <AlbumDetail album={detail} songs={songs}/>
    )
  }
}

const mapStateToProps = ({ album }) => ({ album });

export default connect(mapStateToProps, { getAlbumDetail, getAlbumSongs })(AlbumDetailContainer)
