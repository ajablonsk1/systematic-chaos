import { Button } from 'react-bootstrap';
import styled from 'styled-components';

export const Info = styled(Button)`
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    background-color: var(--button-green);
    border-color: var(--button-green);

    &:hover {
        background-color: green;
        border-color: green;
    }
`;

export const Description = styled.div`
    position: absolute;
    background-color: white;
    color: black;
    z-index: 2;
    padding: 5px;
    border: 2px solid black;

    & p {
        color: blue;
        text-decoration: underline;
        cursor: pointer;
        text-align: center;
        display: inline;
    }
`;
