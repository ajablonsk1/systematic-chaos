import styled from 'styled-components'

export const Info = styled.div`
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  background-color: ${(props) => props.$buttonColor};
  border-color: ${(props) => props.$buttonColor};
  padding: 6px 10px;
  border-radius: 5px;
  position: relative;
  height: 36px;

  &:hover > div {
    display: flex !important;
    flex-direction: column;
  }
`

export const Description = styled.div`
  position: absolute;
  background-color: ${(props) => props.$background};
  color: white;
  z-index: 2;
  padding: 25px;
  bottom: 36px;
  right: 0;
  clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 89% 75%, 94% 100%, 50% 75%, 0% 75%);
  width: 500px;
  height: 400px;
  align-items: center;

  @media (max-width: 768px) {
    width: auto;
    height: 70vh;
  }
`
