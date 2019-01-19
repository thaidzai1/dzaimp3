import React, { Component } from 'react'
import { connect } from 'react-redux'

import { NavBar } from '../components'
import { scrollBarPosition, responsiveNavClickExpand } from '../util/detectScroll'

class NavBarContainer extends Component {
  componentDidMount() {
    let menu = document.querySelector('#menu');
    let navIcon = document.querySelector('#nav-icon');
    window.addEventListener("scroll", () => scrollBarPosition(menu));
    navIcon.addEventListener("click", () => responsiveNavClickExpand(menu, navIcon));
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
