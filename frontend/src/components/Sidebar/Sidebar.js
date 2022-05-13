import React from 'react';
import {buildNavLink, buildNavLinkMobile} from "./navBuilder";
import {SidebarEdit, NavEdit, LogoDiv, MobileNavbar} from "./SidebarStyles";
import {Container, Nav} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'

function Sidebar({link_titles}) {
    return (
        <>
        <SidebarEdit variant="dark" className="d-md-block d-none">
            <Container className="d-flex flex-column">
                <LogoDiv id="logo"><p><FontAwesomeIcon style={{marginRight: '10px'}} icon={faFire} />Systematic Chaos</p></LogoDiv>
                <NavEdit className="me-auto d-flex flex-column" id="menu-options">
                    {link_titles.map(([to, linkTitle]) => buildNavLink(to, linkTitle[0]))}
                </NavEdit>
            </Container>
        </SidebarEdit>
        <MobileNavbar className="d-md-none d-sm-block">
            <Nav className="d-flex justify-content-center">
                {link_titles.map(([to, linkTitle]) => buildNavLinkMobile(to, linkTitle[1]))}
            </Nav>
        </MobileNavbar>
        </>
    );
}

export default Sidebar;
