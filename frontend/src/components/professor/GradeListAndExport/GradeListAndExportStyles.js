import styled from 'styled-components'
import { Tabs, Button, Table } from 'react-bootstrap'
export const GradesContent = styled.div`
  padding: 15px;
`
export const TabsContainer = styled(Tabs)`
  & .nav-link.active {
    background-color: var(--button-green);
    color: white;
  }

  .nav-link:not(.active) {
    color: var(--dark-blue) !important;
  }
`

export const GradesTable = styled(Table)`
  color: var(--font-color);
  margin-bottom: 0;

  th {
    background-color: var(--dark-blue);
    border-color: var(--dark-blue);
  }

  tr {
    border-color: var(--dark-blue);
  }
  td {
    background-color: var(--light-blue);
    border-color: var(--dark-blue);
  }

  thead {
    position: sticky;
    top: 0; /* Don't forget this, required for the stickiness */
  }
`

export const ExportButton = styled(Button)`
  background-color: var(--button-green);
  margin: 10px auto 0 auto;
  display: flex;
  border: none;

  &:disabled,
  &:disabled:hover,
  &:focus {
    border: none;
    background-color: var(--button-green);
    box-shadow: none;
  }

  &:hover {
    background-color: #157e7e;
  }
`
