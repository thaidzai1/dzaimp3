import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const InnerModal = ({ body, isOpen}) => {
  return (
    <>
      <div className='option'>
        <div className='close'>&#10005;</div>
      </div>
      <div className='body'>
        {body}
      </div>
    </>
  )
}

class Modal extends Component {
  componentDidMount() {
    this.modalLayer.addEventListener('click', this.handleCloseModal)
  }

  handleCloseModal = e => {
    if(e.target.classList[0] === 'modal-layer' || e.target.classList[0] === "close") {
      this.modal.classList.add("close");
      setTimeout(() => {
        this.modal.classList.remove("close");
        this.props.toggleModal();
      }, 200);
    }
  }

  render() {
    const { isOpen, toggleModal, children: body} = this.props;
    if(isOpen) {
      this.modalLayer.classList.add('modal-isOpen');
    }
    else if(this.modalLayer) {
      this.modalLayer.classList.remove('modal-isOpen');
    }
    return (
      <div className='modal-layer' ref={elm => this.modalLayer = elm}>
      {
        isOpen ? (
          <div className='modal' ref={elm => this.modal = elm}>
            <InnerModal isOpen={isOpen} body={body} />
          </div>
        ) : null
      }
      </div>
    )
  }
}

Modal.propTypes = {
  body: PropTypes.node,
  toggleModal: PropTypes.func
}

export default Modal
