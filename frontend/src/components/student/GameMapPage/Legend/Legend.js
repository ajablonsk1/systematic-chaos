import React from 'react';

import { Container, Row } from 'react-bootstrap';
import {Activity} from '../../../../utils/constants';
import LegendElement from "./LegendElement";

function Legend() {
    return (
        <Container>
            <Row className="m-0 mb-5">
                <LegendElement activityType={Activity.EXPEDITION}/>
                <LegendElement activityType={Activity.TASK}/>
                <LegendElement activityType={Activity.SURVEY}/>
                <LegendElement activityType={Activity.INFO} mobileLast={true}/>
            </Row>
        </Container>
    );
}

export default Legend;
