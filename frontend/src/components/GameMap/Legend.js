import React from 'react';
import { Container } from 'react-bootstrap';
import { getActivityImg } from '../../utils/constants';
import { ActivityLabel, ActivityImg, LegendCol, LegendRow } from './LegendStyles';


function Legend(props) {
    return (
        <Container>
            <LegendRow>
                <LegendCol className="md-4">
                    <ActivityImg src={getActivityImg('expedition')}></ActivityImg>
                    <ActivityLabel>Ekspedycja</ActivityLabel>
                </LegendCol>
                <LegendCol className="md-4">
                    <ActivityImg src={getActivityImg('task')}></ActivityImg>
                    <ActivityLabel>Zadanie bojowe</ActivityLabel>
                </LegendCol>
                <LegendCol className="md-4">
                    <ActivityImg src={getActivityImg('survey')}></ActivityImg>
                    <ActivityLabel>Wywiad</ActivityLabel>
                </LegendCol>
                <LegendCol className="md-4">
                    <ActivityImg src={getActivityImg('information')}></ActivityImg>
                    <ActivityLabel>Wytyczne</ActivityLabel>
                </LegendCol>
            </LegendRow>
        </Container>
    );
}

export default Legend;