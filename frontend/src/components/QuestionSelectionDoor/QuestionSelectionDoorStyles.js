import styled from 'styled-components'
import door from "./resources/door.png";
import background from "./resources/background.png";
import {ContentWithoutMargin} from "../App/AppGeneralStyles";
import {Col} from "react-bootstrap";

export const Background = styled(ContentWithoutMargin)`
  background: url("${background}") no-repeat center center fixed;
  background-size: cover;
`;

export const Door = styled.div`
  background: url(${door}) no-repeat center center;
  width: 100%;
  height: 55vh;
  //background-color: red;
`;

export const DoorColumn = styled(Col)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`;
