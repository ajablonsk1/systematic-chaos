import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { Content } from '../App/AppGeneralStyles';
import background from './resources/background.png';

export const GameContent = styled(Content)`
    background: url('${background}') no-repeat;
    background-size: cover;
`;

export const Map = styled(Container)`
    width: 70%;

    @media (max-width: 1000px) {
        width: 100%;
    }
`;
