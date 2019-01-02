import React, { Component } from 'react'
import { connect } from 'react-redux'

import { NavBar } from '../components'
import scrollBarPosition from '../util/detectScroll'

class NavBarContainer extends Component {
  componentDidMount() {
    let menu = document.getElementById('menu');
    window.addEventListener("scroll", () => scrollBarPosition(menu));
  }

  render() {
    const { auth } = this.props;

    return (
      <NavBar auth={auth} />
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(NavBarContainer)
