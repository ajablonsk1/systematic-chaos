import { Button } from 'react-bootstrap';
import styled from 'styled-components';

export const Info = styled(Button)`
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    background-color: var(--button-green);
    border-color: var(--button-green);

    &:hover + div {
        display: flex !important;
    }
`;

export const Description = styled.div`
    position: absolute;
    background-color: var(--button-green);
    color: white;
    z-index: 2;
    padding: 25px;
    bottom: 70%;
    right: 0%;
    clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 89% 75%, 94% 100%, 50% 75%, 0% 75%);
    width: 500px;
    height: 400px;
`;
