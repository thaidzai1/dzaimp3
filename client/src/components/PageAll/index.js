import React, { Component } from 'react'

import { BoxMusic } from '../MusicItem'
import Loader from '../../HOC/Loader'
import Loading from '../Loader'
import Modal from '../Modal'
import AddPlaylistModalItem from '../Modal/AddPlaylistModalItem'
import './index.scss'

class PageAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            add_song_id: null,
        }
    }

    addToPlaylist = (song_id=null) => {
        this.setState({
            add_song_id: song_id
        })
    }

    

    render() {
        const { songs, auth, playlist, addSongToPlaylist, removeSongFromPlaylist, fetching } = this.props;
        const { add_song_id } = this.state;

        console.log(auth);

        return (
            <div className="page-all">
                {
                    songs.map((song, index) => 
                        <div className="item-container" key={index}>
                            <BoxMusic item={song} addToPlaylist={this.addToPlaylist}/>
                        </div> 
                    )
                }
                {
                    fetching ? <div className="loader-holder"><Loading /></div> : null
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
        )
    }
}

export default Loader("songs")(PageAll)