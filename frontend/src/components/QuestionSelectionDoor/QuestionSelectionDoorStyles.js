import styled from 'styled-components';
import door from '../../utils/resources/door.png';
import background from '../../utils/resources/background.png';
import { Col } from 'react-bootstrap';

export const Door = styled.div`
    background: url(${door}) no-repeat center center;
    background-size: contain;

    width: 100%;
    height: 55vh;
`;

export const DoorColumn = styled(Col)`
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;

    background: url('${background}') no-repeat center center fixed;
    background-size: cover;
`;
