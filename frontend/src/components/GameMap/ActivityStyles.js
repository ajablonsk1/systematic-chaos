import styled from 'styled-components'
import Button from 'react-bootstrap/Button'



export const Square = styled(Button)`
  margin: 1px;
  background-color: transparent;
  border: 2px solid white;

  &:hover {
    background-color: transparent;
    border: 1px solid black;
  }


`;

export const ActivityImg = styled.img`
  width: 100%;
  height: 100%;
  background-color: white;

`;