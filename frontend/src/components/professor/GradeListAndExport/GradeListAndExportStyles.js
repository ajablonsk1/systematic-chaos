import styled from 'styled-components'
import { Tabs, Button, Table } from 'react-bootstrap'
export const GradesContent = styled.div`
  padding: 15px;
`
export const TabsContainer = styled(Tabs)`
  & .nav-link.active {
    background-color: ${(props) => props.$background};
    color: ${(props) => props.$fontColor};
  }

  .nav-link:not(.active) {
    color: ${(props) => props.$linkColor} !important;
  }
`

export const GradesTable = styled(Table)`
  color: ${(props) => props.$fontColor};
  margin-bottom: 0;

  th {
    background-color: ${(props) => props.$background};
    border-color: ${(props) => props.$background};
  }

  tr {
    border-color: ${(props) => props.$background};
  }
  td {
    background-color: ${(props) => props.$tdColor};
    border-color: ${(props) => props.$background};
  }

  thead {
    position: sticky;
    top: 0; /* Don't forget this, required for the stickiness */
  }
`

export const ExportButton = styled(Button)`
  background-color: ${(props) => props.$buttonColor};
  margin: 10px auto 0 auto;
  display: flex;
  border: none;

  &:disabled,
  &:disabled:hover,
  &:focus {
    border: none;
    background-color: ${(props) => props.$buttonColor};
    box-shadow: none;
  }
`
