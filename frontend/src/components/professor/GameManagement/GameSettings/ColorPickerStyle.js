import styled from 'styled-components'

export const ColorDiv = styled.div`
  background-color: ${(props) => props.$backgroundColor ?? 'white'};
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 0 24px -9px rgba(66, 68, 90, 1);
  position: relative;
`
