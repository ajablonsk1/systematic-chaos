import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import gameMap from './resources/map1.png'

export const GameMapContainer = styled.div`
  height: 90vh;
  width: 90%;
  border: 10px solid var(--dark-blue);
  background: url('${gameMap}') no-repeat center;
  background-size: cover;
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
