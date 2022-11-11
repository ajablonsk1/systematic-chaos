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
