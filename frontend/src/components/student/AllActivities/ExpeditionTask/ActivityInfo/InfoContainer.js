import { Container } from 'react-bootstrap'
import styled from 'styled-components'

export const InfoContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: var(--dark-blue);
  color: var(--font-color);
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95%;
  max-height: 80%;
  margin-top: 20px;
`
