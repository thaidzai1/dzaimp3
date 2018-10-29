import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import TextBox from './TextBox'
import OauthWay from './OauthWay'
import './index.scss'

class LoginPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false
    }
    this.loginForm = React.createRef();
  }

  goToSignUpPage = event => {
    console.log(this.loginForm);
    this.loginForm.current.className += ' redirect';
    event.preventDefault();
    setTimeout(() => {
      this.setState({redirect: true})
    }, 1000)
  }

  render() {
    const { redirect } = this.state;
    if(redirect) {
      return <Redirect to='/signup' />
    }
    return (
      <div className='auth-page'>
        <div className='auth-form' ref={this.loginForm}>
          <h1 className='auth-header'>LOGIN</h1>
          <form>
            <TextBox
              type='text' name='username' labelName="Username" className='username'
            >
            </TextBox>
            <TextBox
              type='password' name='password' labelName="Password" className='password'
            >
            </TextBox>
            <div className='button-group'>
              <button className='but-login'>LOGIN</button>
            </div>
          </form>
          <OauthWay />
          <div className='forgot-pass'>
            <p><a className='forgot-link' onClick={this.goToSignUpPage}>Join with US??? Signup</a> or Forgot password???</p>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage
