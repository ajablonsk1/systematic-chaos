import {Card, Row} from 'react-bootstrap';
import styled from 'styled-components';
import { Content } from '../../App/AppGeneralStyles';

export const GameCardContent = styled(Content)`
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100%;
  max-width: 100%;
`;

export const GameCardOptionPick = styled(Card)`
    height: 100%;
    background-color: var(--dark-blue);
    color: var(--font-color);
`;

export const GameCardRankRow = styled(Row)`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  justify-content: center;
  width: 40%;
  border-radius: 5%;
  border: 1px solid var(--font-color);
  
`
