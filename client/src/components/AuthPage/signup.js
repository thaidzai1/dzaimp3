import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import TextBox from './TextBox'
import OauthWay from './OauthWay'
import './index.scss'

class SignupPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false,
      username: '',
      password: '',
      email: ''
    }
    this.signUpForm = React.createRef();
  }

  goToLoginPage = event => {
    this.signUpForm.current.className += ' redirect';
    event.preventDefault();
    setTimeout(() => {
      this.setState({redirect: true})
    }, 1000)
  }

  signUpNewAccount = event => {
    event.preventDefault();
    const { username, password, email } = this.state;
    const user = {username, password, email};
    this.props.signUp(user);
  }

  handleOnChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    const { redirect } = this.state;
    const { error } = this.props;
    if(redirect) {
      return <Redirect to='/login' />
    }

    return (
      <div className='auth-page'>
        {error ? <p className='error'>{error.message}</p> : null}
        <div className='auth-form' ref={this.signUpForm}>
          <h1 className='auth-header'>SignUp</h1>
          <form onSubmit={this.signUpNewAccount}>
            <TextBox
              type='text' name='username' labelName='Username'
              handleOnChange={this.handleOnChange}
            ></TextBox>
            <TextBox
              type='email' name='email' labelName='Email'
              handleOnChange={this.handleOnChange}
            ></TextBox>
            <TextBox
              type='password' name='password' labelName='Password'
              handleOnChange={this.handleOnChange}
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
