import styled from 'styled-components'
import { Card } from 'react-bootstrap'

export const CustomCard = styled(Card)`
  color: var(--font-color);
  height: 97%;

  & h5 {
    margin: 0;
  }

  & .card-header {
    background-color: var(--dark-blue);
    border-radius: 10px 10px 0 0;
  }

  & .card-body {
    background-color: var(--light-blue);
    border-radius: 0 0 10px 10px;

    & p {
      font-size: 18px;
    }
  }
`
