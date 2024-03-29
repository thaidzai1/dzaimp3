import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const Analyser = ({show}) => {
  return (
    <canvas id='analyser_render' style={{display: show ? 'block' : 'none'}}></canvas>
  )
}

Analyser.propTypes = {
  show: PropTypes.bool
}

export default Analyser
