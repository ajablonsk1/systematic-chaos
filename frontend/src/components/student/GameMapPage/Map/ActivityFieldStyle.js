import styled from 'styled-components'
import { Col, Offcanvas } from 'react-bootstrap'

export const ActivityCol = styled(Col)`
  border: 2px black solid;
  border-radius: 5px;
  margin: 1px;
  padding: 0;
  flex-basis: auto;
  flex-grow: 0;
  width: ${(props) => props.$colSize + 'px'};
  height: ${(props) => props.$colSize + 'px'};

  & img {
    width: 85%;
    height: 85%;
    border-radius: 5px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

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

export const CustomOffcanvas = styled(Offcanvas)`
  background-color: var(--light-blue);
  color: var(--font-color);
  width: 50vw !important;
  z-index: 2000;

  .btn-close {
    filter: invert(81%) sepia(21%) saturate(5299%) hue-rotate(351deg) brightness(101%) contrast(101%);
  }

  table {
    border-top: 1px solid var(--font-color);
    border-spacing: 5px;
    width: 100%;

    tbody {
      tr {
        word-break: break-word;
      }

      th,
      td {
        padding: 10px 0;
        color: lightgrey;
      }

      td:first-child {
        width: 55%;
      }

      tr:nth-of-type(5) {
        border-bottom: 1px solid var(--font-color);
      }

      td:nth-child(odd) {
        color: var(--font-color);
      }

      td:nth-child(even) {
        text-align: right;
      }

      th {
        padding-top: 15px;
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--font-color);
      }
    }
  }
`
