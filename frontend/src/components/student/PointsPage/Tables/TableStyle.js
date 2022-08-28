import { Table } from 'react-bootstrap'
import styled from 'styled-components'

export const TableContainer = styled(Table)`
  color: var(--font-color);

  tbody tr:hover {
    background-color: var(--dark-blue);
    color: var(--font-color);
  }

  thead {
    background-color: var(--dark-blue);
  }

  tbody {
    background-color: var(--light-blue);
  }

  td,
  th {
    color: var(--font-color) !important;
    border: 1px solid var(--dark-blue) !important;
  }
`
