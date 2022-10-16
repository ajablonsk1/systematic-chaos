import styled from 'styled-components'
import { GameCardOptionPick } from '../GameCardStyles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const TableContainer = styled(GameCardOptionPick)`
  position: relative;
  top: 20px;
  margin: 0 25px;
  max-height: ${(props) => props.$customHeight ?? '90vh'};
  overflow: auto;

  table {
    color: ${(props) => props.$fontColor};

    text-align: left;
    position: relative;
    border-collapse: collapse;

    thead {
      position: sticky;
      top: 0; /* Don't forget this, required for the stickiness */
    }

    th {
      background-color: ${(props) => props.$backgroundColor};
      border-color: ${(props) => props.$backgroundColor};
    }
    td {
      border-color: ${(props) => props.$backgroundColor};
    }
  }

  @media (max-width: 575px) {
    max-height: 80vh;
    margin: 0;
  }
`

export const TableRow = styled.tr`
  background-color: ${(props) => props.$backgroundColor};

  &:hover {
    cursor: default;
    background-color: ${(props) => props.$hoverColor};
  }

  td > svg {
    cursor: pointer;
  }
`

export const CustomIcon = styled(FontAwesomeIcon)`
  &:hover {
    cursor: pointer;
  }
`
