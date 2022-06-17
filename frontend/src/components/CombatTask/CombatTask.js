import React, {useRef, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Content } from '../App/AppGeneralStyles';
import Loader from '../Loader/Loader';
import { InfoContainer } from '../ActivityInfo/InfoContainer';
import {
    HeaderRow,
    HeaderCol,
    ActivityImg,
    ActivityName,
    ActivityType,
    FullDivider,
    ActivityCol,
    SmallDivider,
} from '../ActivityInfo/ActivityInfoStyles';
import { getActivityImg, getActivityTypeName } from '../../utils/constants';
import FileService from './FileService';
import { getCombatTask } from '../../storage/combatTask';
import {RemarksCol, RemarksTextArea} from "../ActivityAssessmentDetails/ActivityAssesmentDetailsStyles";
import {SendTaskButton} from "./CombatTaskStyles";

export default function CombatTask() {
    const location = useLocation();
    const { activityId: taskId } = location.state;
    const task = getCombatTask(taskId); // todo: endpoint needed
    const [fileString, setFileString] = useState();
    const [fileName, setFileName] = useState();
    const [answer,setAnswer] = useState('');

    const sendAnswer = () => {
        //use endpoint to save file task answer
        console.log({
            activityId: taskId,
            file: fileString,
            fileName: fileName,
            answer: answer,
            email: "mock@email.com"
        })
    }

    const handleAnswerChange = (event) => {
        setAnswer(event.target.value);
        console.log(event.target.value);
    }

    return (
        <Content>
            <InfoContainer fluid className="p-0">
                {taskId === undefined ? (
                    <Loader />
                ) : (
                    <ActivityCol className="invisible-scroll">
                        <HeaderCol>
                            <HeaderRow>
                                <ActivityImg src={getActivityImg('TASK')}></ActivityImg>
                                <ActivityType>{getActivityTypeName('TASK')}</ActivityType>
                                <ActivityName>{task.name}</ActivityName>
                            </HeaderRow>
                            <FullDivider />
                        </HeaderCol>
                        <div>
                            <h5>{task.description}</h5>
                            <SmallDivider />
                            <p>
                                Zdobyte punkty: <strong>50 / 100</strong> {/*//TODO: info from endpoint*/}
                            </p>
                            <p>
                                <strong>Uwagi prowadzącego:</strong> <br /> Zabrakło mi kilku
                                rzeczy, zaznaczyłem w pliku co mi się nie podoba. Proszę sobie
                                pobrać i sprawdzić {/*//TODO: info from endpoint*/}
                            </p>
                            <SmallDivider />
                            <RemarksCol>
                                <h4>Odpowiedź:</h4>
                                <RemarksTextArea value={answer} onChange={handleAnswerChange} />
                            </RemarksCol>

                            <FileService taskId={task.id} setFile={setFileString} setFileName={setFileName}/>
                        </div>
                        <SendTaskButton disabled={!fileName && answer === ''} onClick={() => sendAnswer()}>Wyślij</SendTaskButton>
                    </ActivityCol>
                )}
            </InfoContainer>
        </Content>
    );
}
