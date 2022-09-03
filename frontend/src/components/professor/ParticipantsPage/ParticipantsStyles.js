import styled from 'styled-components'
import { Content } from '../../App/AppGeneralStyles'
import { Table, Tabs } from 'react-bootstrap'

export const ParticipantsContent = styled(Content)`
  padding: 15px;
`

export const TabsContainer = styled(Tabs)`
  margin-bottom: 10px;

  & .nav-link.active {
    background-color: var(--button-green);
    color: white;
  }

  .nav-link:not(.active) {
    color: var(--dark-blue) !important;
  }
`

export const TableContainer = styled(Table)`
  color: var(--font-color);
  margin-bottom: 0;

  th {
    background-color: var(--dark-blue);
    border: var(--dark-blue) 1px solid;
  }

  tr {
    border: var(--dark-blue) 1px solid;
  }
  td {
    background-color: var(--light-blue);
    border: var(--dark-blue) 1px solid;
  }

  thead {
    position: sticky;
    top: 0; /* Don't forget this, required for the stickiness */
  }

  & tbody tr td {
    vertical-align: middle;
  }
`
