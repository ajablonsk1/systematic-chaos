import styled from 'styled-components'
import { Col, Row } from 'react-bootstrap';


export const ActivityLabel = styled.div`
    display: inline-block;
    width: 70%;
    height: auto;
    color: white !important;
    font-size: 25px;
    text-align: center;
    text-overflow: clip clip;

    @media(max-width: 1200px){
        font-size: 15px;
    }

    @media(max-width: 900px){
        font-size: 12px;
    }

    @media(max-width: 400px){
        font-size: 11px;
    }

`;

export const ActivityImg = styled.img`
    width: 30%;
    height: auto;
    vertical-align: top;

    @media(max-width: 768px){
        width: 20%;
    }
`;

export const LegendCol = styled(Col)`
    background-color: #085454 ;
    padding: 0px;
    margin-right: 10px;
    border: 1px solid black;


`;

export const LegendRow = styled(Row)`
    @media(max-width: 768px){
        padding-bottom: 100px;
    }
`