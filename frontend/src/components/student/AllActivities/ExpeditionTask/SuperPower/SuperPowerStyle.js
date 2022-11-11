import styled from 'styled-components'

export const SuperPowerButton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  opacity: ${(props) => (props.$isBlocked ? 0.7 : 1)};
  border: 1px solid ${(props) => props.$color};
  position: fixed;
  left: ${(props) => (props.$isExpanded ? '340px' : '70px')};
  bottom: 10px;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: ${(props) => (props.$isBlocked ? 'default' : 'pointer')};
  }

  & svg {
    transition: all 0.2s linear;
    color: white;
  }

  &:hover svg {
    transform: ${(props) => (props.$isBlocked ? `scale(1)` : `scale(1.5)`)};
  }

  @media (max-width: 575px) {
    bottom: 85px;
  }
`

export const ShootingPanel = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: ${(props) => (props.$isExpanded ? 'calc(100vw - 330px)' : 'calc(100vw - 55px)')};
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & svg {
    font-size: 128px;
    color: white;

    &:hover {
      cursor: pointer;
    }
  }

  & button {
    position: absolute;
    bottom: 20px;
  }
`
