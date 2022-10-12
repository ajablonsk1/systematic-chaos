import styled from 'styled-components'
import { Card } from 'react-bootstrap'

export const CustomCard = styled(Card)`
  color: ${(props) => props.$fontColor};
  height: ${(props) => props.$customHeight ?? '100%'};
  width: 100%;
  border-radius: 10px;
  border: none;

  & h5 {
    margin: 0;
  }

  & .card-header {
    background-color: ${(props) => props.$background};
    border-radius: 10px 10px 0 0;
  }

  & .card-body {
    background-color: ${(props) => props.$bodyColor};
    border-radius: 0 0 10px 10px;

    & p {
      font-size: 18px;
    }

    & table {
      color: ${(props) => props.$fontColor};
      border: 1px solid ${(props) => props.$background};

      & th,
      & td {
        border: 1px solid ${(props) => props.$background};
      }
    }
  }
`
