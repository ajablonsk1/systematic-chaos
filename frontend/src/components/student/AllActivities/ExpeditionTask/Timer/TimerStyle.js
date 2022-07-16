import styled from 'styled-components'

export const TimerContainer = styled.h1`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  z-index: 3;
  color: ${(props) => (parseInt(props.time) > 10 ? 'black' : 'red')};
`
