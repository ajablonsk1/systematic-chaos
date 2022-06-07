import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import { Content } from '../App/AppGeneralStyles';

export const GameCardContent = styled(Content)`
    padding: 40px;

    max-height: 100%;
    flex-direction: row;
    justify-content: 'space-around';
    display: flex;
    flex-flow: column;
`;

export const GameCardOptionPick = styled(Card)`
    min-height: 100%;
    background-color: var(--dark-blue);
    color: var(--font-color);
    margin-bottom: 15px;
`;
