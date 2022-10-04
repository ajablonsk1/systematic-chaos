import styled from 'styled-components'

export const InformationTable = styled.table`
  width: 100%;
  border: none !important;

  tr {
    word-break: break-word;
  }

  td {
    color: lightgrey;
    border: none !important;
  }

  td:first-child {
    width: 30%;
  }

  td:nth-child(odd) {
    white-space: nowrap;
    color: ${(props) => props.$fontColor};
  }

  td:nth-child(even) {
    text-align: right;
  }
`
