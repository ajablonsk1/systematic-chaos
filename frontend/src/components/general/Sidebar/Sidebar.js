import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Nav } from 'react-bootstrap'
import { buildNavLink, NavLinkStyles } from './navBuilder'
import { LogoDiv, NavBarTextContainer, NavEdit, SidebarEdit } from './SidebarStyles'
import { connect } from 'react-redux'
import { logout } from '../../../actions/auth'
import { GeneralRoutes } from '../../../routes/PageRoutes'

function Sidebar(props) {
  const navigate = useNavigate()
  const link_titles = props.link_titles
  const logOut = () => props.dispatch(logout(navigate))

  return (
    <SidebarEdit variant='dark'>
      <NavBarTextContainer>
        <Nav.Link as={LogoDiv} to={GeneralRoutes.HOME} key={GeneralRoutes.HOME} id='logo'>
          <p>
            <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faFire} />
            <br />
            Systematic Chaos
          </p>
        </Nav.Link>
        <NavEdit className='d-flex flex-column' id='menu-options'>
          {link_titles.map(([to, linkTitle]) => buildNavLink(to, linkTitle[0]))}

          <NavLinkStyles as={Link} key={'logout'} to={GeneralRoutes.HOME} onClick={() => logOut()}>
            <span>Wyloguj</span>
          </NavLinkStyles>
        </NavEdit>
      </NavBarTextContainer>
    </SidebarEdit>
  )
}

function mapStateToProps(state) {
  return {}
}
export default connect(mapStateToProps)(Sidebar)
