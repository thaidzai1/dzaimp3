import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getCurrentUser } from '../actions/authActions'
import LoginPage from './LoginPage'
import SignupPage from './SignUpPage'
import MainPage from './MainPage'
import './App.scss'

class App extends Component {
  componentDidMount(){
    this.props.getCurrentUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className='app'>
          <Route path='/login' exact component={LoginPage}></Route>
          <Route path='/signup'  component={SignupPage}></Route>
          <Route path='/' component={MainPage}></Route>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, { getCurrentUser })(App)
