import styled from 'styled-components'
import { Col, Table } from 'react-bootstrap'

export const CustomTable = styled(Table)`
  margin: 0;
  color: var(--font-color);
  font-size: 15px;

  & th,
  & td {
    border: 1px solid var(--dark-blue) !important;
  }
`

export const ChartCol = styled(Col)`
  height: ${(props) => props.$customHeight ?? '75%'};
  position: relative;

  & canvas {
    width: 100% !important;
    max-height: 100% !important;
    margin: 0 auto;
  }
`
