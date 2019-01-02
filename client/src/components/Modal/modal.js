import React, {Component} from 'react'
import PropTypes from 'prop-types'

const InnerModal = ({toggleModal, body}) => {
  console.log({toggleModal, body});
  return (
    <div className='modal'>
      <div className='close' onClick={toggleModal}>&#10005;</div>
      <div className='body'>
        {body}
      </div>
    </div>
  )
}

InnerModal.propTypes = {
  body: PropTypes.node,
  toggleModal: PropTypes.func
}

export default InnerModal
