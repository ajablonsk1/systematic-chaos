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
  background-color: var(--dark-blue);
  color: var(--font-color);
`

export const ExportButton = styled(Button)`
  background-color: var(--button-green);
  margin: 0 auto;
  display: flex;

  &:disabled,
  &:disabled:hover {
    background-color: var(--button-green);
  }

  &:hover {
    background-color: #157e7e;
  }
`
