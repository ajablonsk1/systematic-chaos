import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { faAnglesLeft, faAnglesRight, faFire } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Nav } from 'react-bootstrap'
import { NavLinkStyles } from './navBuilder'
import { Badge, LogoDiv, NavBarTextContainer, NavEdit, SidebarEdit } from './SidebarStyles'
import { connect } from 'react-redux'
import { logout } from '../../../actions/auth'
import { GeneralRoutes } from '../../../routes/PageRoutes'
import { SET_ASSESSMENT_NUMBERS, SET_EXPANDED } from '../../../actions/types'
import ProfessorService from '../../../services/professor.service'
import { isStudent } from '../../../utils/storageManager'

function Sidebar(props) {
  const navigate = useNavigate()
  const logOut = () => props.dispatch(logout(navigate))

  const isExpanded = props.sidebar.isExpanded
  const assessmentsNumber = props.sidebar.assessments

  useEffect(() => {
    if (props.user && !isStudent(props.user)) {
      ProfessorService.getTasksToEvaluateList().then((response) => {
        const assignmentsNumber = response.map((task) => task.toGrade).reduce((prev, curr) => prev + curr, 0)
        props.dispatch({ type: SET_ASSESSMENT_NUMBERS, payload: assignmentsNumber })
      })
    }
    // eslint-disable-next-line
  }, [props.user])

  const toggleSidebar = () => {
    props.dispatch({
      type: SET_EXPANDED,
      payload: !isExpanded
    })
  }

  return (
    <SidebarEdit $backgroundColor={props.theme.primary}>
      <NavBarTextContainer $fontColor={props.theme.font}>
        <Nav.Link as={LogoDiv} $logoColor={props.theme.font} to={GeneralRoutes.HOME} key={GeneralRoutes.HOME} id='logo'>
          <FontAwesomeIcon icon={faFire} size={'2x'} />
          {isExpanded && <p>Systematic Chaos</p>}
        </Nav.Link>

        <div className={`d-flex w-100  ${isExpanded ? 'justify-content-end pe-3' : 'justify-content-center'}`}>
          <FontAwesomeIcon
            icon={isExpanded ? faAnglesLeft : faAnglesRight}
            size={'lg'}
            color={props.theme.background}
            onClick={toggleSidebar}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <NavEdit className='d-flex flex-column' id='menu-options'>
          {props.link_titles.map((link) => (
            <div key={link.navigateTo} className={isExpanded ? '' : 'd-flex flex-column align-items-center'}>
              <NavLinkStyles
                $hoverColor={props.theme.font}
                as={Link}
                to={link.navigateTo}
                onClick={() => {
                  if (link.action === 'LOGOUT') {
                    logOut()
                  }
                }}
                style={{
                  color: window.location.pathname === link.navigateTo ? props.theme.font : props.theme.background
                }}
              >
                <div style={{ width: 30, textAlign: 'center' }}>
                  <FontAwesomeIcon icon={link.icon} />
                </div>
                {isExpanded && <span className={'ps-2'}>{link.name}</span>}
                {link.action === 'BADGE' && <Badge $badgeColor={props.theme.danger}>{assessmentsNumber}</Badge>}
              </NavLinkStyles>

              {link.subpages && (
                <div
                  className={isExpanded ? 'ms-3' : ''}
                  style={{ borderLeft: isExpanded ? `2px solid ${props.theme.background}` : 'none' }}
                >
                  {link.subpages.map((sublink) => (
                    <NavLinkStyles
                      $hoverColor={props.theme.font}
                      $fontColor={props.theme.background}
                      as={Link}
                      key={sublink.navigateTo}
                      to={sublink.navigateTo}
                      className={isExpanded ? 'ps-3' : ''}
                      style={{
                        color:
                          window.location.pathname === sublink.navigateTo ? props.theme.font : props.theme.background
                      }}
                    >
                      <div style={{ width: 30, textAlign: 'center' }}>
                        <FontAwesomeIcon icon={sublink.icon} />
                      </div>
                      {isExpanded && <span className={isExpanded ? 'ps-2' : ''}>{sublink.name}</span>}
                    </NavLinkStyles>
                  ))}
                </div>
              )}
            </div>
          ))}
        </NavEdit>
      </NavBarTextContainer>
    </SidebarEdit>
  )
}

function mapStateToProps(state) {
  const sidebar = state.sidebar
  const theme = state.theme
  const { user } = state.auth

  return { sidebar, user, theme }
}
export default connect(mapStateToProps)(Sidebar)
