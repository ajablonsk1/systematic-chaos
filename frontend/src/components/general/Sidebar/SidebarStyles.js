import styled from 'styled-components'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const SidebarEdit = styled(Navbar)`
  background-color: ${(props) => props.$backgroundColor};
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
    color: ${(props) => props.$fontColor};
  }
`

export const NavEdit = styled(Nav)`
  font-size: 1.15vw;
  margin-top: 3vh;
  padding: 10px;
  width: 100%;
`

export const LogoDiv = styled(Link)`
  color: ${(props) => props.$logoColor};
  font-size: 1.5vw;
  margin-top: 10px;
  text-align: center;
  min-height: 92px;
`

export const MobileNav = styled.div`
  background-color: ${(props) => props.$background};
  width: 100%;
  padding: 10px 0;
  position: fixed;
  top: 100%;
  left: 0;
  transform: translateY(-100%);
  z-index: 3;
`

export const Badge = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => props.$badgeColor};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 10px;
  font-weight: bolder;
`
