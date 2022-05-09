import React from 'react';
import {buildNavLink} from "./navBuilder";
import {SidebarEdit} from "./SidebarStyles";
import {Container, Nav} from "react-bootstrap";

function Sidebar({link_titles}) {
    return (
        <SidebarEdit variant="dark" className="d-md-block d-none">
            <Container className="d-flex flex-column">
                <div id="logo"><p>Systematic Chaos</p></div>
                <Nav className="me-auto d-flex flex-column" id="menu-options">
                    {link_titles.map(([to, linkTitle]) => buildNavLink(to, linkTitle))}
                </Nav>
            </Container>
        </SidebarEdit>
    );
}

export default Sidebar;
