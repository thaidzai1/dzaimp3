import React, { Component } from 'react'
import { connect } from 'react-redux'

import { NavBar } from '../components'

class NavBarContainer extends Component {
  render() {
    const { auth } = this.props;

    return (
      <NavBar auth={auth} />
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(NavBarContainer)
