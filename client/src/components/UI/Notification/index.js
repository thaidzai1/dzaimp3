import React from 'react'

import './index.scss'

const Notification = ({active, message}) => {
    return (
        <div className='notification' style={{right: active ? '0px' : '-410px'}}>
            <p>{message}</p>
            <div className='status-bar'>
                <div className='bar'></div>
            </div>
        </div>
    )
}

export default Notification