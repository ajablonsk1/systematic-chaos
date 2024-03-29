import styled from 'styled-components'

export const TimerContainer = styled.h1`
  position: absolute;
  z-index: 3;
  color: ${(props) => (parseInt(props.time) > 10 ? 'black' : 'red')};
`
export const GraphTrigger = styled.div`
  width: 50px;
  height: 50px;
  position: fixed;
  right: 10px;
  bottom: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  & svg {
    transition: all 0.2s linear;
    color: white;
  }

  &:hover svg {
    transform: scale(1.5);
  }

  @media (max-width: 575px) {
    bottom: 85px;
  }
`
export const GraphContainer = styled.div`
  position: fixed;
  right: 50px;
  bottom: 50px;
  border-radius: 20px;
  background-color: white;
  overflow: hidden;
  transition: all 0.2s linear;

  @media (max-width: 575px) {
    bottom: 140px;
    right: 10px;
    width: 95vw;
  }
`
