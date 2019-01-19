import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons'

const ListItem = ({list, auth, showSongs, deletePlaylist}) => {

  return (
    <div className='list-item'>
      <div className='list-info' onClick={() => showSongs(list.songs, list._id)}>
        <div className='disc-container'>
          <FontAwesomeIcon icon={faCompactDisc} className='disc'/>
        </div>
        <div className='info'>
          <p>{list.list_name}</p>
        </div>
      </div>
      <div className='remove' onClick={() => deletePlaylist(auth.user._id, list._id,)}>
        &#x2715;
      </div>
    </div>
  )
}

ListItem.propTypes = {
  list: PropTypes.object,
  auth: PropTypes.object,
  showSongs: PropTypes.func,
  deletePlaylist: PropTypes.func
}

export default ListItem
