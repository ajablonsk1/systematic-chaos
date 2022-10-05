import { Table } from 'react-bootstrap'
import styled from 'styled-components'

export const TableContainer = styled(Table)`
  color: ${(props) => props.$fontColor};

  tbody tr:hover {
    background-color: ${(props) => props.$background};
    color: ${(props) => props.$fontColor};
  }

  thead {
    background-color: ${(props) => props.$background};
  }

  tbody {
    background-color: ${(props) => props.$bodyColor};
  }

  td,
  th {
    color: ${(props) => props.$fontColor} !important;
    border: 1px solid ${(props) => props.$background} !important;
  }
`
