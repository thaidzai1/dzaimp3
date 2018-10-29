import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGooglePlusG, faFacebookF } from '@fortawesome/free-brands-svg-icons'

const OauthWay = props => {
  return (
    <div className='auth-oauth'>
      <p><span className='lazy'>Lazy???</span> Another way:</p>
      <div className='oauth-icon'>
        <a href="/auth/google">
          <FontAwesomeIcon className='icon-google icon' icon={faGooglePlusG} />
        </a>
        <FontAwesomeIcon className='icon-facebook icon' icon={faFacebookF} />
      </div>
    </div>
  )
}

export default OauthWay
