import { Container } from 'react-bootstrap'
import styled from 'styled-components'

export const SummaryContainer = styled(Container)`
  color: ${(props) => props.$fontColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: ${(props) => props.$background};

  position: relative;
  top: 100px;
`
