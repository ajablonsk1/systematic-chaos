import styled from 'styled-components'

export const HorizontalPointsLine = styled.div`
  padding-top: 60px;

  ul {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto;
    gap: 10px;
    border-top: 3px solid #e9ecef;
    list-style-type: none;
    position: relative;

    &::before {
      content: '';
      display: block;
      width: calc(100% - 20px);
      height: 200px;
      background-color: #919bb1;
      position: absolute;
      bottom: -46px;
      left: 10px;
      border-radius: 10px;
    }
  }

  li {
    text-align: center;
    position: relative;

    &:first-child .rankInfo {
      svg {
        color: green;
        position: absolute;
        bottom: -30px;
        left: 50%;
        transform: translateX(-50%);
        width: 20px;
        height: 20px;
      }
    }

    &:nth-child(2) {
      .rankInfo {
        .left-arrow,
        .right-arrow {
          clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%);
          background-color: var(--light-blue);
          opacity: 0.1;
          width: 130px;
          height: 200px;
          position: absolute;
          top: 30px;

          &::before,
          &::after {
            content: '';
            width: 124px;
            height: 194px;
            display: block;
            position: absolute;
            clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%);
            background-color: #919bb1;
            top: 3px;
            bottom: 3px;
            right: 3px;
            left: 3px;
          }
        }

        .left-arrow {
          left: -50px;
        }

        .right-arrow {
          right: -50px;
        }
      }
    }

    &::before {
      content: '';
      border-right: 3px dashed #dee2e6;
      display: block;
      height: 30px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .pointsInfo {
    position: relative;
    bottom: 55px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--button-green);
    width: fit-content;
    padding: 10px;
    color: white;
    border-radius: 10px;
  }
`
export const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;

  &:hover > div {
    visibility: visible;
  }

  & > div {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 100%;
    left: 50%;
    margin-left: -60px;

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: black transparent transparent transparent;
    }
  }
`

export const PercentageBar = styled.div`
  height: fit-content;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 10px);

  &::after,
  &::before {
    content: '';
    display: block;
    height: ${(props) => (props.$height ? props.$height + 'px' : '10px')};
    border-radius: 50px;
  }
  &::after {
    width: ${(props) => props.$greenBarWidth + 'px'};
    background-color: darkgreen;
    top: 0;
    position: absolute;
  }

  &::before {
    position: relative;
    width: ${(props) => props.$grayBarWidth + 'px'};
    right: 50%;
    transform: translateX(50%);
    background-color: lightgray;
  }
`
