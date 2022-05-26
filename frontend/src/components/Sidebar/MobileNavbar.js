import React from 'react';
import { Nav } from 'react-bootstrap';
import { buildNavLinkMobile } from './navBuilder';
import { MobileNav } from './SidebarStyles';

export default function MobileNavbar({ link_titles }) {
    return (
        <MobileNav>
            <Nav className="justify-content-center">
                {link_titles.map(([to, linkTitle]) => buildNavLinkMobile(to, linkTitle[1]))}
            </Nav>
        </MobileNav>
    );
}
