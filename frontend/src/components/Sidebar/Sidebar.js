import React from 'react';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Nav } from 'react-bootstrap';
import { PageRoutes } from '../../utils/constants';
import { buildNavLink } from './navBuilder';
import { LogoDiv, NavBarTextContainer, NavEdit, SidebarEdit } from './SidebarStyles';

function Sidebar({ link_titles }) {
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
                </NavEdit>
            </NavBarTextContainer>
        </SidebarEdit>
    );
}

export default Sidebar;
