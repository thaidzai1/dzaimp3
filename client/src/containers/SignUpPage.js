import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { signUp } from '../actions/authActions'
import { AuthPage } from '../components'

class SignupPage extends Component {

  render() {
    const { auth, signUp } = this.props;
    console.log(auth);
    if(auth !== null && auth.user !== undefined){
      return <Redirect to='/' />
    }
    return (
      <AuthPage.SignupPage signUp={signUp} error={auth ? auth.error : null}/>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, { signUp })(SignupPage)
