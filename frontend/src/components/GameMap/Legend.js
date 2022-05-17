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
                    <ActivityLabel>Expedition</ActivityLabel>
                </LegendCol>
                <LegendCol className="md-4">
                    <ActivityImg src={getActivityImg('task')}></ActivityImg>
                    <ActivityLabel>Task</ActivityLabel>
                </LegendCol>
                <LegendCol className="md-4">
                    <ActivityImg src={getActivityImg('survey')}></ActivityImg>
                    <ActivityLabel>Survey</ActivityLabel>
                </LegendCol>
                <LegendCol className="md-4">
                    <ActivityImg src={getActivityImg('information')}></ActivityImg>
                    <ActivityLabel>Information</ActivityLabel>
                </LegendCol>
            </LegendRow>
        </Container>
    );
}

export default Legend;