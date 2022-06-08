import { Button } from 'react-bootstrap';
import styled from 'styled-components';

export const Title = styled.div`
    font-size: 48px;
    font-weight: 500;
    text-align: center !important;
    margin: 0 auto;
`
export const AddButton = styled(Button)`
    position:fixed;
    right:0;
    bottom:0;
    background-color: var(--button-green) !important;
    border: var(--button-green) !important;
    color: var(--font-color) !important;
    box-shadow: none !important;
    width: 80px;
    height: 80px;
    border-radius: 40px;

    &:hover {
        -webkit-box-shadow: 0px 0px 30px 5px var(--button-green) !important;
        -moz-box-shadow: 0px 0px 30px 5px var(--button-green) !important;
        box-shadow: 0px 0px 30px 5px var(--button-green) !important;
    }

    &:active {
        background-color: var(--font-color) !important;
        border: var(--font-color) !important;
        color: var(--button-green) !important;
        -webkit-box-shadow: 0px 0px 30px 5px var(--font-color) !important;
        -moz-box-shadow: 0px 0px 30px 5px var(--font-color) !important;
        box-shadow: 0px 0px 30px 5px var(--font-color) !important;
    }

    @media (max-width: 767px) {
        bottom: 30px;
        margin-right: 15px !important;
    }
`;