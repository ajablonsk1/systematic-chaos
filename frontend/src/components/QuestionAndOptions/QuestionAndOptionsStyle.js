import styled from "styled-components";
import { ContentWithoutMargin } from "../App/AppGeneralStyles";
import background from "../../utils/resources/background.png";
import {Button, Row} from "react-bootstrap";

export const ContentWithBackground = styled(ContentWithoutMargin)`
  background: url("${background}") no-repeat center center fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const QuestionCard = styled.div`
  width: 100%;
  height: 80vh;
  
  background-color: var(--dark-blue);
  color: var(--font-color);
  margin: 10px;
  text-align: center;
  
  & div:first-child{
    font-size: 50px;
    
    &::after{
      content: '';
      display: block;
      width: 80%;
      height: 2px;
      margin: 20px auto;
      background-color: var(--font-color);
      border-radius: 50px;
    }
  }
  
  & div:nth-child(2){
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 50px;
    height: 70%;
    font-size: 23px;
  }
  
  & div:last-child{
    font-size: 23px;
    text-align: right;
    padding-right: 50px;
  }
`;

export const Answer = styled(Row)`
  margin: 10px 0 0 0;
  padding: 20px 10px;
  font-size: 23px;
  background-color: var(--dark-blue);
  color: var(--font-color);
  max-width: 95%;
  
  & > *{
    padding: 0;
  }
`;

export const ButtonRow = styled(Row)`
  margin: 10px auto 0 auto;
  
  & > Button{
    font-size: 23px;
    margin: 0 auto;
  }
`;
