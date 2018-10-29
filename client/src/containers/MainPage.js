import React, { Component } from 'react'
import { NavBar } from '../components'
import { connect } from 'react-redux'

class MainPage extends Component {
  render() {
    console.log(this.props);
    return (
      <div className='main-page'>
        <h1>{this.props.auth.user ? this.props.auth.user.username : 'nothing'}</h1>
        <NavBar />
      </div>
    )
  }
}

const mapStateToProps = ({auth}) => ({auth});

export default connect(mapStateToProps)(MainPage)
