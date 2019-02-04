import React, { Component } from 'react'
import { connect } from 'react-redux'

import { PageAll } from '../components'
import { getSongWithPaging, fetchSongOnScroll } from '../actions/songActions'
import { addSongToPlaylist, removeSongFromPlaylist } from '../actions/playlistActions'

class PageAllContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            fetching: false
        }
    }
    componentDidMount() {
        const { location: { search }, getSongWithPaging } = this.props;
        let params = new URLSearchParams(search);
        if(params && params.get("page") >= 1) {
            getSongWithPaging(params.get("page"));
        }
        else {
            getSongWithPaging(1);
        }
        this.setState({
            page: this.state.page + 1
        })
        window.addEventListener("scroll", this.onScroll.bind(this), false);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps !== this.props;
    }

    onScroll = async () => {
        let nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 0;
        let { song } = this.props;
        if(song.songs && song.songs.length < song.songQuantity) {
            if(nearBottom && !this.state.fetching) {
                this.props.fetchSongOnScroll(this.state.page);
                this.setState({
                    // fetching: true,
                    page: this.state.page + 1
                });
            }
        }
    }

    render() {
        const { song, playlist, auth, addSongToPlaylist, removeSongFromPlaylist } = this.props;
        let PageAllProps = { songs: song.songs, playlist, addSongToPlaylist, removeSongFromPlaylist, fetching: this.state.fetching, auth };
        return (
            <PageAll {...PageAllProps}/>
        )
    }   
}

const mapStateToProps = ({ song, playlist, auth }) => ({ song, playlist, auth });

export default connect(mapStateToProps, { getSongWithPaging, fetchSongOnScroll, addSongToPlaylist, removeSongFromPlaylist })(PageAllContainer)