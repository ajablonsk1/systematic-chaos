import React from 'react';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Nav } from 'react-bootstrap';
import { PageRoutes } from '../../utils/constants';
import { buildNavLink, NavLinkStyles } from './navBuilder';
import { LogoDiv, NavBarTextContainer, NavEdit, SidebarEdit } from './SidebarStyles';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { Link } from 'react-router-dom';

function Sidebar(props) {
    const link_titles = props.link_titles;
    const logOut = () => props.dispatch(logout());

    return (
        <SidebarEdit variant="dark">
            <NavBarTextContainer>
                <Nav.Link as={LogoDiv} to={PageRoutes.HOME} key={PageRoutes.HOME} id="logo">
                    <p>
                        <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faFire} />
                        <br />
                        Systematic Chaos
                    </p>
                </Nav.Link>
                <NavEdit className="d-flex flex-column" id="menu-options">
                    {link_titles.map(([to, linkTitle]) => buildNavLink(to, linkTitle[0]))}

                    <NavLinkStyles
                        as={Link}
                        key={'logout'}
                        to={PageRoutes.HOME}
                        onClick={() => logOut()}
                    >
                        <span>Wyloguj</span>
                    </NavLinkStyles>
                </NavEdit>
            </NavBarTextContainer>
        </SidebarEdit>
    );
}

function mapStateToProps(state) {
    return {};
}
export default connect(mapStateToProps)(Sidebar);
