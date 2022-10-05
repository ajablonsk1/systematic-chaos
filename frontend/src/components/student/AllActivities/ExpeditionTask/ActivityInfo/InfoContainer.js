import { Container } from 'react-bootstrap'
import styled from 'styled-components'

export const InfoContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${(props) => props.$background};
  color: ${(props) => props.$fontColor};
  width: 95%;
  max-height: 80%;
  margin-top: 20px;
`
