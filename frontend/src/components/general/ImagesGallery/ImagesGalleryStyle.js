import styled from 'styled-components'
import { Dropdown } from 'react-bootstrap'

export const ImageContainer = styled.div`
  border: 1px solid rgba(255, 179, 16, 0.5);

  &:hover {
    cursor: pointer;
  }
`

export const ControlPanel = styled(Dropdown)`
  position: absolute;
  top: 0;
  right: 0;

  .dropdown-toggle::before {
    display: none !important;
  }
  .dropdown-menu {
    min-width: auto;
  }
`
