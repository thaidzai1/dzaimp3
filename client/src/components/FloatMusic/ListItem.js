import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons'

const ListItem = ({list, showSongs}) => {

  return (
    <div className='list-item' onClick={songs => showSongs(list.songs)}>
      <div className='disc'>
        <FontAwesomeIcon icon={faCompactDisc}/>
      </div>
      <div className='info'>
        <p>{list.list_name}</p>
      </div>
    </div>
  )
}

export default ListItem
