import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import { Content } from '../../App/AppGeneralStyles'

export const GameContent = styled(Content)`
  max-height: 100vh;
`

export const Map = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${(props) => `url(${props.$background}) no-repeat center`};
  background-size: ${(props) => (props.$width && props.$height ? `${props.$width} ${props.$height}` : 'cover')};

  @media (max-width: 1000px) {
    width: 100%;
  }
`
