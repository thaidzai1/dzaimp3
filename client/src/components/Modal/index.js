import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const InnerModal = ({toggleModal, body}) => {
  return (
    <div className='modal'>
      <div className='option'>
        <div className='close' onClick={() => toggleModal()}>&#10005;</div>
      </div>
      <div className='body'>
        {body}
      </div>
    </div>
  )
}

class Modal extends Component {
  constructor(props) {
    super(props);

    this.modalLayer = React.createRef();
  }
  componentDidMount() {
    const modalLayer = document.getElementById('modal-layer');
    modalLayer.addEventListener('click', this.handleCloseModal);
  }

  handleCloseModal = e => {
    if(e.target.classList[0] === 'modal-layer') {
      this.props.toggleModal();
    }
  }

  render() {
    const { isOpen, toggleModal, children: body} = this.props;
    if(isOpen) {
      // return (
      //   <div className='modal-layer modal-isOpen' id='modal-layer'>
      //     <InnerModal isOpen={isOpen} body={body} toggleModal={toggleModal}/>
      //   </div>
      // )
      this.modalLayer.current.classList.add('modal-isOpen');
    }
    else if(this.modalLayer.current) {
      this.modalLayer.current.classList.remove('modal-isOpen');
    }
    return (
      <div className='modal-layer' id='modal-layer' ref={this.modalLayer}>
        <InnerModal isOpen={isOpen} body={body} toggleModal={toggleModal}/>
      </div>
    )
  }
}

Modal.propTypes = {
  body: PropTypes.node,
  toggleModal: PropTypes.func
}

export default Modal
