import styled from 'styled-components'

export const TableBodyRow = styled.tr`
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.$background};
  }
`
