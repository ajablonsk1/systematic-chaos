import styled from 'styled-components'

export const InformationImage = styled.img`
  max-width: 90%;
  margin-bottom: 20px;
`

export const InformationTable = styled.table`
  width: 100%;
  border: none !important;

  tr {
    word-break: break-all;
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
    color: var(--font-color);
  }

  td:nth-child(even) {
    text-align: right;
  }
`
