import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const NavLinkStyles = styled(Nav.Link)`
  color: ${(props) => props.$fontColor};
  padding: 9px 0;
  display: flex;

  &:hover {
    color: ${(props) => props.$hoverColor} !important;
  }

  &:visited,
  &:link {
    color: ${(props) => props.$fontColor};
    text-decoration: none;
  }
`

export const NavLinkStylesMobile = styled(Nav.Link)`
  color: ${(props) => props.$fontColor};
  padding: 5px 13px;
  &:visited,
  &:link {
    color: ${(props) => props.$fontColor};
    text-decoration: none;
  }

  @media (max-width: 575px) {
    padding: 5px 10px;
  }
`

export function buildNavLinkMobile(to, content) {
  return (
    <NavLinkStylesMobile as={Link} key={to} to={to}>
      <FontAwesomeIcon icon={content} />
    </NavLinkStylesMobile>
  )
}
