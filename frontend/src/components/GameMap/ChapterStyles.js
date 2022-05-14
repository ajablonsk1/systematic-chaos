import styled from 'styled-components'
import { Container } from 'react-bootstrap';


export const Border = styled.div`
  margin: 0 auto;
  height: 70%;

  @media(max-width: 768px){
    height: 40%;
  }

  @media(max-width: 600px){
    height: 30%;
  }

`;

export const MyContainer = styled(Container)`
  margin-left: 75px;

  @media(max-width: 1600px){
    margin-left: 50px;
  }

  @media(max-width: 1200px){
    margin-left: 30px;
  }

  @media(max-width: 992px){
    margin-left: 20px;
  }

  @media(max-width: 600px){
    margin-left: 15px;
  }

`;
