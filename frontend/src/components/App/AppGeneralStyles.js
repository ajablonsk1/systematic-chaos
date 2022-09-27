import { Col } from 'react-bootstrap'
import styled from 'styled-components'

export const Content = styled.div`
  min-height: 100vh;
  padding: 0;
  width: 100%;
`

export const SidebarCol = styled(Col)`
  display: none;
  padding: 0;
  transition: width 0.15s linear;
`
