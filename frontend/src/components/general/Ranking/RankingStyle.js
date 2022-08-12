import styled from 'styled-components'
import { GameCardOptionPick } from '../../student/GameCardPage/GameCardStyles'

export const TableContainer = styled(GameCardOptionPick)`
  position: relative;
  top: 20px;
  margin: 0 25px;

  table {
    color: var(--font-color);

    th {
      background-color: var(--dark-blue);
      border-color: var(--dark-blue);
    }
    td {
      border-color: var(--dark-blue);
    }
  }
`

export const TableRow = styled.tr`
  background-color: ${(props) => props.$backgroundColor};

  &:hover {
    cursor: default;
    background-color: var(--dark-blue);
  }
`
