import { Button } from 'react-bootstrap';
import styled from 'styled-components';

export const Info = styled(Button)`
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    background-color: var(--button-green);
    border-color: var(--button-green);
    transition: visibility 0.5s linear;

    &:hover + div {
        /* background-color: green;
        border-color: green; */
        display: flex !important;
        visibility: visible !important;
    }
`;

export const Description = styled.div`
    position: absolute;
    background-color: var(--button-green);
    color: white;
    z-index: 2;
    padding: 5px;
    bottom: 70%;
    right: 0%;
    clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%);
    width: 500px;
    height: 400px;
    padding: 5px;
`;
