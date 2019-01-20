import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Song } from '../components'
import { hideShowAnalyser } from '../actions/analyserActions'
import { startPlaylist } from '../actions/playerActions'
import { getSongInAlbum } from '../actions/albumActions'

class AlbumListen extends Component {
    componentDidMount() {
        const { match: {params: {id}}, player, hideShowAnalyser } = this.props;
        if(player === null) {
            this.getAndSetUpAlbum(id);
        }
        else {
            if(player._id !== id) {
                this.getAndSetUpAlbum(id);
            }
        }
        hideShowAnalyser(true);
    }

    componentWillUnmount() {
        this.props.hideShowAnalyser(false);
    }

    getAndSetUpAlbum = async id => {
        let { startPlaylist } = this.props;
        let list = await getSongInAlbum(id);
        console.log(list);
        startPlaylist(list, list[0]._id, 0);
    }

    render() {
        return (
            <Song {...this.props}/>
        )
    }
}

const mapStateToProps = ({ player }) => ({ player })

export default connect(mapStateToProps, { startPlaylist, hideShowAnalyser })(AlbumListen)