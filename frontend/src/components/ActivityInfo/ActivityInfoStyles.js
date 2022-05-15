import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const ActivityImg = styled.img`
    height: 40px;
    width: 40px;
    margin: 10px;

    @media (max-width: 800px) {
        height: 20px;
        width: 20px;
        margin: 5px;
    } ;
`;

export const ActivityType = styled.h1`
    text-align: left;
    @media (max-width: 800px) {
        font-size: 1.5rem;
    } ;
`;

export const ActivityName = styled.h1`
    text-align: right;
    margin-left: auto;
    @media (max-width: 800px) {
        font-size: 1.5rem;
    } ;
`;

export const FullDivider = styled.hr`
    background-color: var(--font-color);
`;

export const SmallDivider = styled.hr`
    background-color: var(--font-color);
    width: 20%;
`;

export const StartActivityButton = styled(Button)`
    background-color: var(--green);
    bottom: 0;
    position: 'absolute';
    margin-left: 'auto';
    margin-right: 'auto';
    margin-bottom: '20px';
`;
