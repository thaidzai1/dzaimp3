import React from 'react'

const AddPlaylistModalItem = ({playlist}) => {
  return (
    <div className='modal-playlist-item'>
      <img src='/image/playlist.svg' />
      <p>{playlist.list_name}</p>
    </div>
  )
}

export default AddPlaylistModalItem
