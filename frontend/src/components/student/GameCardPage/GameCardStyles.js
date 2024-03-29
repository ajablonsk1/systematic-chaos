import styled from 'styled-components'
import { Card } from 'react-bootstrap'

export const CustomCard = styled(Card)`
  color: ${(props) => props.$fontColor};
  height: ${(props) => props.$customHeight ?? '100%'};
  width: 100%;
  border-radius: 10px;
  border: none;

  & .card-header {
    background-color: ${(props) => props.$background};
    font-weight: bold;
    margin: 0;
    letter-spacing: 1px;
  }

  & .card-body {
    background-color: ${(props) => props.$bodyColor};
    border-radius: 0 0 var(--bs-card-border-radius) var(--bs-card-border-radius);

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

  @media (max-width: 575px) {
    & .card-body {
      overflow: auto;
    }
  }
`
