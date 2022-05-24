import styled from 'styled-components';
import { Button, Col, Row } from 'react-bootstrap';

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
    bottom: 0;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    background-color: #085454;
`;

export const ButtonFooter = styled.div`
    position: sticky;
    bottom: 0;
    margin: 0;
    background-color: var(--dark-blue);
`;

export const ActivityCol = styled(Col)`
    overflow-y: scroll;
    scroll: hidden;
    text-align: center;
    scrollbar-width: none;
`;

export const HeaderRow = styled(Row)`
    background-color: var(--dark-blue);
`;

export const HeaderCol = styled(Col)`
    position: sticky;
    top: 0;
    height: auto;
    background-color: var(--dark-blue);
`;

export const Spacer = styled.div`
    height: 5vh;
`;
