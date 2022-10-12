import styled from 'styled-components'

export const TimerContainer = styled.h1`
  position: absolute;
  z-index: 3;
  color: ${(props) => (parseInt(props.time) > 10 ? 'black' : 'red')};
`
export const GraphTrigger = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  right: 10px;
  bottom: 10px;
  border-radius: 50%;
  background-color: white;
  z-index: 3;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const GraphContainer = styled.div`
  position: absolute;
  right: 50px;
  border-radius: 20px;
  background-color: white;
  overflow: hidden;
  transition: all 0.2s linear;
`
