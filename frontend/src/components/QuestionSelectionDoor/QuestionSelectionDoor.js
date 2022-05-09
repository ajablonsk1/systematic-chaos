import React from 'react';
import {Background, Door, DoorColumn} from "./QuestionSelectionDoorStyles";
import {Button, Row} from "react-bootstrap";


function generateDoor(question, key){
    return(
        <DoorColumn key={key}>
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
        <Background>
            <Row>
                {questions.map((question, key) => generateDoor(question, key))}
            </Row>
        </Background>
    );
}

export default QuestionSelectionDoor;
