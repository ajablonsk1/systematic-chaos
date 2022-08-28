import { Container } from 'react-bootstrap'
import styled from 'styled-components'

export const SummaryContainer = styled(Container)`
  color: var(--font-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: var(--dark-blue);

  position: relative;
  top: 100px;
`
