import React, { Component } from 'react'

import './LoaderSongItem.scss'
import { Loading } from '../components'

const Loader = propName => WrappedComponent => {
  return class Loader extends Component {
    isLoading(data) {
      if(data === null || data === undefined) {
        return true;
      }

      return false;
    }
    render() {
      // console.log(this.props[propName]);
      return this.isLoading(this.props[propName]) ? 
        <div className='loader-holder'><Loading /></div> 
        : <WrappedComponent {...this.props}/>
    }
  }
}

export default Loader
