import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { signUp } from '../actions/authActions'
import { AuthPage } from '../components'

class SignupPage extends Component {

  render() {
    const { auth, signUp } = this.props;

    return (
      <AuthPage.SignupPage signUp={signUp}/>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, { signUp })(SignupPage)
