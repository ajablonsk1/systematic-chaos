import styled from 'styled-components'

export const TableBodyRow = styled.tr`
  border: 1px solid ${(props) => props.$background};
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.$background};
  }
`
