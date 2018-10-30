import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getCurrentUser } from '../actions/authActions'
import LoginPage from './LoginPage'
import SignupPage from './SignUpPage'
import MainPage from './MainPage'

class App extends Component {
  componentDidMount(){
    this.props.getCurrentUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div className='app'>
          <Route path='/' exact component={MainPage}></Route>
          <Route path='/login' component={LoginPage}></Route>
          <Route path='/signup' component={SignupPage}></Route>
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, { getCurrentUser })(App)
