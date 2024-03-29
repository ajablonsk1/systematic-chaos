import { Row } from 'react-bootstrap'
import styled from 'styled-components'
import background from '../../../../../utils/resources/graphTask/background5.jpg'
import { Content } from '../../../../App/AppGeneralStyles'

export const ContentWithBackground = styled(Content)`
  background: url('${background}') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;

  @media (max-width: 575px) {
    padding: 100px 20px 20px 20px;
  }
`

export const QuestionCard = styled.div`
  height: 80vh;

  background-color: ${(props) => props.$background};
  color: ${(props) => props.$fontColor};
  margin: 0;
  text-align: center;
  /* width: calc(100% - var(--margin)); */

  & div:first-child {
    font-size: 50px;

    &::after {
      content: '';
      display: block;
      width: 80%;
      height: 2px;
      margin: 20px auto;
      background-color: ${(props) => props.$fontColor};
      border-radius: 50px;
    }
  }

  & div:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 50px;
    height: 70%;
    font-size: 23px;
  }

  & div:last-child {
    font-size: 23px;
    text-align: right;
    padding-right: 50px;
  }
`

export const Answer = styled(Row)`
  padding: 20px 10px;
  font-size: 23px;
  background-color: ${(props) => props.$background};
  color: ${(props) => props.$fontColor};
  max-width: 95%;
  margin: 0 0 10px;

  & > * {
    padding: 5px;
  }

  & input {
    width: 100%;
    height: 100%;
    accent-color: green;
  }
`

export const ButtonRow = styled(Row)`
  margin: 10px auto 0 auto;

  & > button {
    font-size: 23px;
    margin: 0 auto;
    background-color: ${(props) => props.$background};
    border: none;
    width: 50%;
    padding: 10px;
    color: white;
    border-radius: 10px;
    outline-color: darkgreen;

    &:hover {
      background-color: ${(props) => props.$background};
      filter: brightness(85%);
    }
  }
`
