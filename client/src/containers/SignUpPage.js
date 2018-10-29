import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { AuthPage } from '../components'

class SignupPage extends Component {

  render() {
    const { auth } = this.props;

    if(auth.user !== undefined){
      return <Redirect to='/' />
    }

    return (
      <AuthPage.SignupPage />
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(SignupPage)
