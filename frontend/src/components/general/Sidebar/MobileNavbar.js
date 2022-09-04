import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import { logout } from '../../../actions/auth'
import { buildNavLinkMobile, NavLinkStylesMobile } from './navBuilder'
import { MobileNav } from './SidebarStyles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { GeneralRoutes } from '../../../routes/PageRoutes'

function MobileNavbar(props) {
  const navigate = useNavigate()

  // todo: for teacher bar is too many icons, fix it
  const link_titles = props.link_titles
  const logOut = () => props.dispatch(logout(navigate))

  return (
    <MobileNav>
      <Nav className='justify-content-center'>
        {link_titles.map(([to, linkTitle]) => buildNavLinkMobile(to, linkTitle[1]))}
        <NavLinkStylesMobile as={Link} key={'logout'} to={GeneralRoutes.HOME} onClick={() => logOut()}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </NavLinkStylesMobile>
      </Nav>
    </MobileNav>
  )
}

function mapStateToProps(state) {
  return {}
}
export default connect(mapStateToProps)(MobileNavbar)
