import styled from 'styled-components'
import { GameCardOptionPick } from '../GameCardStyles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const TableContainer = styled(GameCardOptionPick)`
  position: relative;
  top: 20px;
  margin: 0 25px;
  max-height: 80vh;
  overflow: auto;

  table {
    color: var(--font-color);

    text-align: left;
    position: relative;
    border-collapse: collapse;

    thead {
      position: sticky;
      top: 0; /* Don't forget this, required for the stickiness */
    }

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

export const CustomIcon = styled(FontAwesomeIcon)`
  &:hover {
    cursor: pointer;
  }
`
