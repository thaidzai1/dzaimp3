import React from 'react'
import { Link } from 'react-router-dom'

const Menu = props => {
  return (
    <div className='menu'>
      <ul>
        <li className='label'><Link to='/'><img src='/image/DzaiMp3.png' /></Link></li>
        <li><Link to='/' className='menu-item'>Home</Link></li>
        <li><Link to='/albums' className='menu-item'>Albums</Link></li>
        <li><Link to='/hot' className='menu-item'>Hot 100</Link></li>
        <li><Link to='/myplaylist' className='menu-item'>My Playlists</Link></li>
        <li className='on-right'><Link to='Login' className='menu-item'>Login</Link></li>
        <li className='on-right'><a href='/auth/logout' className='menu-item'>Logout</a></li>
      </ul>
    </div>
  )
}

export default Menu
