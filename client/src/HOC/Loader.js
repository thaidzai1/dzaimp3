import React, { Component } from 'react'

import './LoaderSongItem.scss'

const Loader = propName => WrappedComponent => {
  return class Loader extends Component {
    render() {
      // console.log(this.props[propName]);
      return this.props[propName].length === 0 ? 
        <div className='loader-holder'><div className='loader'/></div> 
        : <WrappedComponent {...this.props}/>
    }
  }
}

export default Loader
