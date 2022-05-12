import styled from 'styled-components'
import background from "./resources/background.png";



export const Border = styled.div`
  background-size: 100% auto;

  position: absolute;
  padding: 5px;
  width: var(--content-width-without-margin);
  height: 100vh;
  border: 1px solid black;
  right: 0px;
  background: url("${background}") no-repeat;
  background-size: cover;

  @media(max-width: 768px){
    left: 0;
    width: 100vw!important;
  }

`;