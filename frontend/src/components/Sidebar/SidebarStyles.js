import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

export const SidebarEdit = styled(Navbar)`
    width: var(--sidebar-width);
    height: 100vh;
    background-color: purple; // TODO: use figma color, this is for testing only
    position: fixed;
    top: 0;
    left: 0;
    padding: 0;
`;
