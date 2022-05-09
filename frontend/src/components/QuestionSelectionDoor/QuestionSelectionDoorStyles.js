import styled from 'styled-components'
import door from "./resources/door.png";
import background from "./resources/background.png";
import {Col} from "react-bootstrap";


export const Door = styled.div`
  background: url(${door}) no-repeat center center;
  background-size: 100% auto;

  width: 100%;
  height: 55vh;

  @media(max-width: 1200px){
    background-size: auto 100%;
  }
`;


export const DoorColumn = styled(Col)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;


  background: url("${background}") no-repeat center center fixed;
  background-size: cover;
`;

