import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const AddPlaylistModalItem = ({
  playlist, user_id, song_id,
  addSongToPlaylist, removeSongFromPlaylist
}) => {

  let addedStickClass = ['add-list'];
  let SongInPlaylist = false;
  if(playlist.songs && playlist.songs.filter(song => song._id === song_id).length > 0) {
    addedStickClass.push('added');
    SongInPlaylist = true;
  }

  return (
    <div className='modal-playlist-item'
      onClick={
        SongInPlaylist ?
        () => removeSongFromPlaylist(user_id, playlist._id, song_id) :
        () => addSongToPlaylist(user_id, playlist._id, song_id)
      }
    >
      <img src='/image/playlist.svg' />
      <p>{playlist.list_name}</p>
      <FontAwesomeIcon icon={faCheck} className={addedStickClass.join(' ')}/>
    </div>
  )
}

AddPlaylistModalItem.propTypes = {
  playlist: PropTypes.object,
  user_id: PropTypes.string,
  song_id: PropTypes.string,
  addSongToPlaylist: PropTypes.func,
  removeSongFromPlaylist: PropTypes.func
}

export default AddPlaylistModalItem
