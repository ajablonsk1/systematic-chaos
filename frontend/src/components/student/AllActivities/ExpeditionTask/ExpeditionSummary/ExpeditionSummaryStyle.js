import { Container } from 'react-bootstrap';
import styled from 'styled-components';

export const SummaryContainer = styled(Container)`
    transform: translate(-50%, -50%);
    background-color: var(--dark-blue);
    color: var(--font-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    text-align: center;
    margin: 0 auto;
    padding: 30px;
    top: 50%;
    left: 50%;
`;
