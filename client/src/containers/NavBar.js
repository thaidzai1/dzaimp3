import React, { Component } from 'react'
import { connect } from 'react-redux'

import { NavBar } from '../components'
import { scrollBarPosition, responsiveNavClickExpand } from '../util/detectScroll'
import { getSearchResult } from '../actions/searchActions'
import { getSongAudio } from '../actions/playerActions'

class NavBarContainer extends Component {
  componentDidMount() {
    let menu = document.querySelector('#menu');
    let navIcon = document.querySelector('#nav-icon');
    window.addEventListener("scroll", () => scrollBarPosition(menu));
    navIcon.addEventListener("click", () => responsiveNavClickExpand(menu, navIcon));
  }

  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

  render() {
    const { auth } = this.props;
    return (
      <NavBar {...this.props} />
    )
  }
}

const mapStateToProps = ({ auth, search }) => ({ auth, search })

export default connect(mapStateToProps, { getSearchResult, getSongAudio })(NavBarContainer)
