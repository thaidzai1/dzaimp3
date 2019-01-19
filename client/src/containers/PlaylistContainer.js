import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Song } from '../components'
import { startPlaylist } from '../actions/playerActions'
import { getPlaylist } from '../actions/playlistActions'
import { hideShowAnalyser } from '../actions/analyserActions'

class Playlist extends Component {
    componentDidMount() {
        const { match: {params: {id, user_id}}, player, hideShowAnalyser } = this.props;
        console.log('playlist didmount', this.props);
        if(player === null) {
            this.getAndSetUpPlaylist(id, user_id);
        }
        else {
            if(player._id !== id || player.user_list !== user_id) {
                this.getAndSetUpPlaylist(id, user_id);
            }
        }
        hideShowAnalyser(true);
    }

    componentWillUnmount() {
        this.props.hideShowAnalyser(false);
    }

    shouldComponentUpdate(nextProps) {  
        return this.props.player !== nextProps.player;
    }

    getAndSetUpPlaylist = async (id, user_id) => {
        let { getPlaylist, startPlaylist } = this.props;
        let { _id: UserList, list} = await getPlaylist(user_id, id);
        let { list_name, songs} = list[0];
        startPlaylist(songs, list[0]._id, 0, UserList);
    }

    checkRedirectRoute = (id, user_id, player) => {
        if(player !== null && (player._id !== id || player.user_list !== user_id)) {
            console.log('redirect', {_id: player._id, id, user_id, user_list: player.user_list});
            return <Redirect to={`/playlist/${player._id}-${player.user_list}`} />
        }
    }

    render() {
        const { match: { params: {id, user_id}}, player, startPlaylist } = this.props;
        console.log(id, user_id, player);
        
        return (
            <>
                <Song player={player} startPlaylist={startPlaylist}/>
                {this.checkRedirectRoute(id, user_id, player)}
            </>
            
        )
    }
}

const mapStateToProps = ({ player }) => ({ player });

export default connect(mapStateToProps, { hideShowAnalyser, startPlaylist, getPlaylist})(Playlist)