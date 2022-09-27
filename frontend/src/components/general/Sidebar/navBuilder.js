import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const NavLinkStyles = styled(Nav.Link)`
  color: white;
  padding: 9px 0;
  display: flex;

  &:hover {
    color: var(--font-color) !important;
  }

  &:visited,
  &:link {
    color: white;
    text-decoration: none;
  }
`

export const NavLinkStylesMobile = styled(Nav.Link)`
  font-size: 26px;
  color: white;
  padding: 5px 13px;
  &:visited,
  &:link {
    color: white;
    text-decoration: none;
  }
`

export function buildNavLinkMobile(to, content) {
  return (
    <NavLinkStylesMobile as={Link} key={to} to={to}>
      <FontAwesomeIcon icon={content} />
    </NavLinkStylesMobile>
  )
}
