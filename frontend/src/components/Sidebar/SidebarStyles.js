import styled from 'styled-components';
import { Navbar, Nav } from 'react-bootstrap';


export const SidebarEdit = styled(Navbar)`
    width: var(--sidebar-width);
    height: 100vh;
    background-color: var(--dark-blue);
    position: fixed;
    top: 0;
    left: 0;
    padding: 0;
`;

export const NavEdit = styled(Nav)`
    font-size: 23px;
    margin-top: 3vh;
    width: 100%;
    padding: 10px;
`;

export const LogoDiv = styled.div`
    color: var(--font-color);
    font-size: 26px;
    margin-top: 10px;
`;

export const MobileNavbar = styled.div`
  background-color: var(--dark-blue);
  width: 100vw;
  height: 100px;
  position: fixed;
  top: 100%;
  left: 0;
  transform: translateY(-50%);
  z-index: 3;
`;
