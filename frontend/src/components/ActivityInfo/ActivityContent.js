import { useNavigate } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { getActivityImg, getActivityTypeName } from '../../utils/constants';
import {
    ActivityImg,
    ActivityType,
    ActivityName,
    FullDivider,
    SmallDivider,
    ButtonFooter,
    ActivityCol,
    HeaderRow,
    HeaderCol,
    Spacer,
    StartActivityButton,
} from './ActivityInfoStyles';
import { PageRoutes, START_GRAPH_NODE_ID } from '../../utils/constants';
import {useEffect, useState} from "react";

import StudentService from "../../services/student.service";
import {convertSecondsToStringInfo} from "../../utils/Api";

export default function ActivityContent(props) {
    const navigate = useNavigate();
    const [activityScore, setActivityScore] = useState(undefined);
    const activityId = props.activityId;
    // const [activityGroup, setActivityGroup] = useState(undefined);
    const [loadedScore, setLoadedScore] = useState(false);
    const [pointsReceived, setPointsReceived] = useState(0);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    useEffect(() => {
        // todo: possible bug
        StudentService.getActivityScore(activityId).then(response => {
            setActivityScore(response ?? 0);
            //console.log(response.id ?? "not defined");
            //console.log(props.activity.questions[0]);
            setLoadedScore(true);
        });
    }, [activityId, props]);

    useEffect(() => {
        if (loadedScore){
            StudentService.getUserGroup().then(
                response => {
                    // setActivityGroup(response);
                    return response;
                }
            )
                .then((activityGroup) => {
                    const givenTimeData = props.activity.requirement.accessDates.find(el => el.group.find(el => el.name === activityGroup.name));
                    setStartDate(new Date(...givenTimeData.dateFrom));
                    setEndDate(new Date(...givenTimeData.dateTo));
                });
            //
            if(activityScore.id){
                StudentService.getActivityAllPoints(activityScore.id).then(response => {console.log(response); setPointsReceived(response)})

            }
        }
    }, [loadedScore, activityScore?.id, props.activity.requirement]);


    const resetStorageAndStart = () => {

        localStorage.setItem('startDate', new Date());
        localStorage.removeItem('userAnswers'); // todo: remove it, saving to db, not to localStorage
        localStorage.removeItem('userOpenAnswers'); // todo: remove it, saving to db, not to localStorage

        if(activityScore.id){
            //clean previous answers
            navigate(`${PageRoutes.QUESTION_SELECTION}`, {
                state: {
                    activityId: props.activityId,
                    nodeId: START_GRAPH_NODE_ID,
                    taskResultId: activityScore.id,
                },
            });
        } else {
            StudentService.getTaskAnswerId(props.activityId).then(
                response =>
                {   console.log(response);
                    navigate(`${PageRoutes.QUESTION_SELECTION}`, {
                    state: {
                        activityId: props.activityId,
                        nodeId: props.activity.questions[0].id,
                        //later get the first question on endpoint
                        taskResultId: response.id,
                    },
                });}
            );
        }


    };

    return (
        <>
            {(loadedScore && props.activity) &&
                <ActivityCol className="invisible-scroll">
                    <HeaderCol>
                        <HeaderRow>
                            <ActivityImg src={getActivityImg('EXPEDITION')}></ActivityImg>
                            <ActivityType>{getActivityTypeName('EXPEDITION')}</ActivityType>
                            <ActivityName>{props.activity.name}</ActivityName>
                        </HeaderRow>
                        <FullDivider />
                    </HeaderCol>

                    <div>
                        <p>{props.activity.description}</p>
                        <SmallDivider />
                        {props.activity.requiredKnowledge && <>
                            <p>Wymagana wiedza:</p>
                            <p>{props.activity.requiredKnowledge}</p>
                        </>
                        }
                        <Spacer />

                        {loadedScore && <p>Obecna liczba punktów - {pointsReceived}</p>}
                        <p>Maksymalna liczba punktów do zdobycia - {props.activity.maxPoints}</p>
                        <p>Liczba punktów licząca się jako 100% - {props.activity.maxPoints100}</p>
                        <Spacer />

                        {!props.activity.requirement ? (
                            <p>Aktywność nie ma ustawionego limitu czasowego</p>
                            ) :
                        (<>
                            <p>
                            Data dostępności aktywności - od{' '}
                            {startDate && (startDate.toLocaleDateString() + ' ' + startDate.toLocaleTimeString())} do{' '}
                            {endDate && (endDate.toLocaleDateString() + ' ' + endDate.toLocaleTimeString())}
                            </p>
                            <p>Pozostało {convertSecondsToStringInfo(endDate)}</p>
                        </>)}

                    </div>

                    <ButtonFooter>
                        <Col>
                            <FullDivider />
                            {/* for now only one attempt is possible */}
                            <StartActivityButton disabled={activityScore.id} onClick={() => resetStorageAndStart()}>
                                Rozpocznij
                            </StartActivityButton>
                        </Col>
                    </ButtonFooter>
                </ActivityCol>
        }</>
    );
}
