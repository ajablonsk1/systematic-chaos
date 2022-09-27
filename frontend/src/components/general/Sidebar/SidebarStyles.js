import styled from 'styled-components'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const SidebarEdit = styled(Navbar)`
  background-color: var(--dark-blue);
  position: sticky;
  top: 0;
  padding: 0;
  height: 100vh;
`

export const NavBarTextContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  padding: 0;

  & #logo:hover {
    color: var(--font-color);
  }
`

export const NavEdit = styled(Nav)`
  font-size: 1.15vw;
  margin-top: 3vh;
  padding: 10px;
  width: 100%;
`

export const LogoDiv = styled(Link)`
  color: var(--font-color);
  font-size: 1.5vw;
  margin-top: 10px;
  text-align: center;
  min-height: 92px;
`

export const MobileNav = styled.div`
  background-color: var(--dark-blue);
  width: 100%;
  padding: 10px 0;
  position: fixed;
  top: 100%;
  left: 0;
  transform: translateY(-100%);
  z-index: 3;
`
