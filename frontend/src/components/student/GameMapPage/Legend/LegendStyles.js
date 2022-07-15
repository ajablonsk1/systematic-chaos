import styled from 'styled-components'
import { Col } from 'react-bootstrap'

export const LegendCol = styled(Col)`
  color: white;
  height: 80px;
  padding: 0 5px;

  font-size: 100%;
  text-align: center;

  & div {
    background-color: var(--button-green);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  & div img {
    width: auto;
    height: 100%;
  }

  & div p {
    display: inline;
    width: 100%;
  }
`
