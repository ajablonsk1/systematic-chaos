import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import { logout } from '../../../actions/auth'
import { NavLinkStylesMobile } from './navBuilder'
import { MobileNav } from './SidebarStyles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function MobileNavbar(props) {
  const navigate = useNavigate()
  const logOut = () => props.dispatch(logout(navigate))

  return (
    <MobileNav>
      <Nav className='justify-content-center'>
        {props.link_titles.map((link) => (
          <NavLinkStylesMobile
            as={Link}
            key={link.navigateTo}
            to={link.navigateTo}
            onClick={() => {
              if (link.action === 'LOGOUT') {
                logOut()
              }
            }}
          >
            <FontAwesomeIcon icon={link.icon} />
          </NavLinkStylesMobile>
        ))}
      </Nav>
    </MobileNav>
  )
}

function mapStateToProps(state) {
  return {}
}
export default connect(mapStateToProps)(MobileNavbar)
