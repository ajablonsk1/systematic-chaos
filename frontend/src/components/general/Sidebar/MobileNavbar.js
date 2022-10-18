import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import { logout } from '../../../actions/auth'
import { NavLinkStylesMobile } from './navBuilder'
import { MobileNav } from './SidebarStyles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isStudent } from '../../../utils/storageManager'

function MobileNavbar(props) {
  const navigate = useNavigate()
  const logOut = () => props.dispatch(logout(navigate))
  const student = isStudent(props.user)

  return (
    <MobileNav $background={props.theme.primary}>
      <Nav className='justify-content-center'>
        {props.link_titles.map((link) => (
          <NavLinkStylesMobile
            $fontColor={props.theme.background}
            style={{ fontSize: student ? 26 : 20 }}
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
  const { user } = state.auth
  const theme = state.theme
  return { theme, user }
}
export default connect(mapStateToProps)(MobileNavbar)
