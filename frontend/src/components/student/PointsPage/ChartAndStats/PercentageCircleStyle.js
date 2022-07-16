import styled from 'styled-components'

export const Chart = styled.div`
  width: 100%;
  justify-content: space-around;

  & svg {
    display: block;
    margin: 10px auto;
    max-width: 80%;
    max-height: 250px;
  }
`

export const Percentage = styled.text`
  fill: white;
  font-size: 0.5em;
  text-anchor: middle;
  font-weight: bold;

  &:last-child {
    font-size: 0.18em;
    font-weight: normal;
  }
`

export const Circle = styled.path`
  stroke: var(--font-color);
  fill: var(--dark-blue);
  stroke-width: 2.8;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;

  @keyframes progress {
    0% {
      stroke-dasharray: 0 100;
    }
  }
`
