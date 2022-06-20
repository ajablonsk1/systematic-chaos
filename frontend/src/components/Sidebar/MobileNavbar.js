import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { PageRoutes } from '../../utils/constants';
import { buildNavLinkMobile, NavLinkStylesMobile } from './navBuilder';
import { MobileNav } from './SidebarStyles';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function MobileNavbar(props) {
    // todo: for teacher bar is too many icons, fix it
    const link_titles = props.link_titles;
    const logOut = () => props.dispatch(logout());

    return (
        <MobileNav>
            <Nav className="justify-content-center">
                {link_titles.map(([to, linkTitle]) => buildNavLinkMobile(to, linkTitle[1]))}
                <NavLinkStylesMobile
                    as={Link}
                    key={'logout'}
                    to={PageRoutes.HOME}
                    onClick={() => logOut()}
                >
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </NavLinkStylesMobile>
            </Nav>
        </MobileNav>
    );
}

function mapStateToProps(state) {
    return {};
}
export default connect(mapStateToProps)(MobileNavbar);
