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
`

export const GradesTable = styled(Table)`
  background-color: var(--dark-blue);
  color: var(--font-color);
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`

export const ExportButton = styled(Button)`
  background-color: var(--button-green);
  margin: 0 auto;
  display: flex;
`
