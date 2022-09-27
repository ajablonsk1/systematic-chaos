import styled from 'styled-components'

export const TimerContainer = styled.h1`
  position: absolute;
  z-index: 3;
  color: ${(props) => (parseInt(props.time) > 10 ? 'black' : 'red')};
`
