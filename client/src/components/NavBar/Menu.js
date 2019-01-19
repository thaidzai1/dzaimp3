import React from 'react'
import { Link } from 'react-router-dom'

const Menu = props => {
  const {auth} = props;
  const renderAuth = () => {
    if(auth === null){
      return [
        <li key='login' className='on-right'><Link to='/login' className='menu-item'>Login</Link></li>
      ]
    }
    return [
      <li key='logout' className='on-right'>
        <a href="/auth/logout" className='menu-item'>{ auth.user.username }</a>
      </li>
    ]
  }
  return (
    <div className='menu' id='menu'>
      <ul>
        <li className='label'><Link to='/'><img src='/image/DzaiMp3.png' /></Link></li>
        <li><Link to='/' className='menu-item'>Home</Link></li>
        <li><Link to='/albums' className='menu-item'>Albums</Link></li>
        <li><Link to='/myplaylist' className='menu-item'>My Playlists</Link></li>
        { renderAuth() }
        <li className="resp-icon">
          <div id="nav-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Menu
