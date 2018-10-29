import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import TextBox from './TextBox'
import OauthWay from './OauthWay'
import './index.scss'

class SignupPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false
    }
    this.signUpForm = React.createRef();
  }

  goToLoginPage = event => {
    console.log(this.signUpForm);
    this.signUpForm.current.className += ' redirect';
    event.preventDefault();
    setTimeout(() => {
      this.setState({redirect: true})
    }, 1000)
  }

  render() {
    const { redirect } = this.state;
    if(redirect) {
      return <Redirect to='/login' />
    }

    return (
      <div className='auth-page'>
        <div className='auth-form' ref={this.signUpForm}>
          <h1 className='auth-header'>SignUp</h1>
          <form>
            <TextBox
              type='text' name='username' labelName='Username'
            ></TextBox>
            <TextBox
              type='password' name='password' labelName='Password'
            ></TextBox>
            <div className='button-group'>
              <button className='but-login'>Sign Up</button>
            </div>
          </form>
          <OauthWay />
          <div className='forgot-pass'>
            <p><a className='forgot-link' onClick={this.goToLoginPage}>You are member already!!!</a> or Forgot password???</p>
          </div>
        </div>
      </div>
    )
  }
}

export default SignupPage
