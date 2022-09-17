import styled from 'styled-components'

export const Info = styled.div`
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  background-color: var(--button-green);
  border-color: var(--button-green);
  padding: 6px 10px;
  border-radius: 5px;

  &:hover + div {
    display: flex !important;
    flex-direction: column;
  }
`

export const Description = styled.div`
  position: absolute;
  background-color: var(--button-green);
  color: white;
  z-index: 2;
  padding: 25px;
  bottom: 28%;
  right: 80px;
  clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 89% 75%, 94% 100%, 50% 75%, 0% 75%);
  width: 500px;
  height: 400px;
  align-items: center;

  @media (max-width: 768px) {
    width: auto;
    height: 70vh;
  }
`
