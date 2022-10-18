import { Card } from 'react-bootstrap'
import styled from 'styled-components'

export const GameCardOptionPick = styled(Card)`
  height: 100%;
  background-color: ${(props) => props.$background};
  color: ${(props) => props.$fontColor};
`
