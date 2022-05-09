import React from 'react';
import { Door, DoorColumn } from './QuestionSelectionDoorStyles';
import { Button, Row } from 'react-bootstrap';
import { ContentWithoutMargin } from '../App/AppGeneralStyles';

// if only one element of id -1 or -2 then do not generate doors but go to score screen
// will be done in routing after answering a question, so that we never get only the start or only the end node here

function generateDoor(question, key) {
    return (
        <DoorColumn key={key} xl={4} md={12}>
            <Row className="mx-auto">
                <h3>{question.difficulty.toUpperCase()}</h3>
            </Row>

            <Row>
                <Door />
            </Row>

            <Row className="mx-auto">
                <h3>{question.questionHint.toUpperCase()}</h3>
            </Row>

            <Row className="mx-auto">
                <Button>Wybierz</Button>
            </Row>
        </DoorColumn>
    );
}

function QuestionSelectionDoor({ questions }) {
    return (
        <ContentWithoutMargin>
            <Row>{questions.map((question, key) => generateDoor(question, key))}</Row>
        </ContentWithoutMargin>
    );
}

export default QuestionSelectionDoor;
