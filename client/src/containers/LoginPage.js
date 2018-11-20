import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { Login } from '../actions/authActions'
import { AuthPage } from '../components'

class LoginPage extends Component {
  render() {
    const { auth, Login } = this.props;
    if(auth !== null){
      return <Redirect to='/' />
    }

    return (
      <AuthPage.LoginPage handleLogin={ Login }/>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, { Login })(LoginPage)
