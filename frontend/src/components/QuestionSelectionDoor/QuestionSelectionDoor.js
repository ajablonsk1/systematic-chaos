import React from 'react';
import {Door, DoorColumn} from "./QuestionSelectionDoorStyles";
import {Button, Row} from "react-bootstrap";
import {ContentWithoutMargin} from "../App/AppGeneralStyles";


function generateDoor(question, key){
    return(
        <DoorColumn key={key} xl={4} md={12}>
            <Row className='mx-auto'>
                <h3>{question.DIFFICULTY.toUpperCase()}</h3>
            </Row>

            <Row>
                <Door/>
            </Row>

            <Row className='mx-auto'>
                <h3>{question.CATEGORY.toUpperCase()}</h3>
            </Row>

            <Row className='mx-auto'>
                <Button>Wybierz</Button>
            </Row>
        </DoorColumn>
    )
}

function QuestionSelectionDoor({questions}) {
    return (
        <ContentWithoutMargin>
            <Row>
                {questions.map((question, key) => generateDoor(question, key))}
            </Row>
        </ContentWithoutMargin>
    );
}

export default QuestionSelectionDoor;
