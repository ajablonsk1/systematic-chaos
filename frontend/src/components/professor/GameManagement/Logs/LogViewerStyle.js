import styled from 'styled-components'

export const Console = styled.div`
  background-color: black;
  width: 95%;
  height: 800px;
  margin: 0 auto;
  border-radius: 10px;
  position: relative;
`
export const Downloader = styled.div`
  position: absolute;
  right: 0;
  top: -40px;
  padding: 10px;

  & > svg {
    color: black;
  }
`

export const ConsoleContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  letter-spacing: 2px;
  overflow: auto;

  & span:first-child {
    color: lightgreen;
  }
  & span:nth-child(2) {
    color: mediumpurple;
  }
`
