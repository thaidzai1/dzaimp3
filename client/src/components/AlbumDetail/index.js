import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons'

import { BarMusic } from '../MusicItem'
import AddPlaylistModalItem from '../Modal/AddPlaylistModalItem'
import Modal from '../Modal'
import Loader from '../../HOC/Loader'
import './index.scss'

const AlbumListSongs = ({songs, detail, uiAddSongToPlaylist, startPlaylist}) => {
  if(songs.length === 0) {
    return (
      <div className='list-song'>
        Album is empty
      </div>
    )
  }
  return (
    <div className='list-song'>
      {
        songs.map((song, index) => 
          <BarMusic 
            key={index} index={index} item={song} 
            Play={index => startPlaylist(songs, detail._id, index)}
            AddToPlaylist={uiAddSongToPlaylist}
          />
        )
      }
    </div>
  )
}

const AlbumDetail = ({ auth, playlist, detail, songs, startPlaylist, addSongToPlaylist, removeSongFromPlaylist, uiAddSongToPlaylist, UI }) => {
  if(songs === undefined) { songs = [] };
  return (
    <>
      <div className='album-detail'>
        <div className='album-info'>
          <div className='album-pic'>
            <img src={`/image/poster/${detail.poster}`} />
            <FontAwesomeIcon icon={faPlayCircle} className='btn-play' onClick={() => startPlaylist(songs, detail._id)}/>
          </div>
          <div className='detail'>
            <h1>{detail.name}</h1>
            <h2>Singer: {detail.singer.name}</h2>
          </div>
        </div>
        <AlbumListSongs songs={songs} uiAddSongToPlaylist={uiAddSongToPlaylist} startPlaylist={startPlaylist} detail={detail}/>
      </div>
      <Modal isOpen={UI.add_song_id ? true : false} toggleModal={uiAddSongToPlaylist}>
        {
          auth && playlist ?
            playlist.list.map((item, index) =>
              <AddPlaylistModalItem key={index}
                playlist={item}
                user_id={auth.user._id}
                song_id={UI.add_song_id}
                addSongToPlaylist={addSongToPlaylist}
                removeSongFromPlaylist={removeSongFromPlaylist}
              />
            )
            : <p>Login to use playlilst</p>
        }
      </Modal>
    </>
  )
}

export default Loader('detail')(AlbumDetail)
