import styled from 'styled-components'
import { Col } from 'react-bootstrap'

export const ActivityCol = styled(Col)`
  border: 2px black solid;
  border-radius: 5px;
  margin: 1px;
  padding: 0;
  flex-basis: auto;
  flex-grow: 0;

  & img,
  & div {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`
