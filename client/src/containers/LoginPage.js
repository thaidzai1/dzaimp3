import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { AuthPage } from '../components'

class LoginPage extends Component {
  render() {
    const { auth } = this.props;
    if(auth !== null){
      return <Redirect to='/' />
    }

    return (
      <AuthPage.LoginPage />
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(LoginPage)
