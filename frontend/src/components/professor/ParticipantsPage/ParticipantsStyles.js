import styled from 'styled-components'
import { Content } from '../../App/AppGeneralStyles'
import { Table, Tabs } from 'react-bootstrap'

export const ParticipantsContent = styled(Content)`
  padding: 15px;
`

export const TabsContainer = styled(Tabs)`
  margin-bottom: 10px;

  & .nav-link.active {
    background-color: ${(props) => props.$background};
    color: ${(props) => props.$fontColor};
  }

  .nav-link:not(.active) {
    color: ${(props) => props.$linkColor} !important;
  }
`

export const TableContainer = styled(Table)`
  color: ${(props) => props.$fontColor};
  margin-bottom: 0;

  th {
    background-color: ${(props) => props.$background};
    border: ${(props) => props.$background} 1px solid;
  }

  tr {
    border: ${(props) => props.$background} 1px solid;
  }
  td {
    background-color: ${(props) => props.$tdColor}; // light
    border: ${(props) => props.$background} 1px solid;
  }

  thead {
    position: sticky;
    top: 0; /* Don't forget this, required for the stickiness */
  }

  & tbody tr td {
    vertical-align: middle;
  }
`
