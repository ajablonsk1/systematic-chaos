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
    const [activityGroup, setActivityGroup] = useState(undefined);
    const [loadedScore, setLoadedScore] = useState(false);
    const [pointsReceived, setPointsReceived] = useState(0);
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
            StudentService.getUserGroup().then(response => {setActivityGroup(response)});
            if(activityScore.id){
                StudentService.getActivityAllPoints(activityScore.id).then(response => {console.log(response); setPointsReceived(response)})
            }
        }
    }, [loadedScore, activityScore?.id]);
    //
    // useEffect(() => {
    //     // convertSecondsToStringInfo()
    //     console.log("3");
    // }, [activityGroup])

    // console.log(activityScore);

    // const points = localStorage.getItem('currentScore'); // todo: remove and get it from endpoint

    //TODO: currently hardcoded for "all" group, we need to check which group the user is in later
    // todo: get user group start and end date from endpoint
    // const startDate = new Date(props.activity.accessDates.all.start);
    // const endDate = new Date(props.activity.accessDates.all.end);


    const resetStorageAndStart = () => {

        localStorage.setItem('startDate', new Date());
        localStorage.removeItem('userAnswers'); // todo: remove it, saving to db, not to localStorage
        localStorage.removeItem('userOpenAnswers'); // todo: remove it, saving to db, not to localStorage
        // TODO: clean previous attempt on API
        // for now below if branch is not used (until we find a way to clean previous attempts)
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
                            <ActivityImg src={getActivityImg('expedition')}></ActivityImg>
                            <ActivityType>{getActivityTypeName('expedition')}</ActivityType>
                            <ActivityName>{props.activity.name}</ActivityName>
                        </HeaderRow>
                        <FullDivider />
                    </HeaderCol>

                    <div>
                        <p>{props.activity.description}</p>
                        <SmallDivider />
                        {props.activity.requiredInfo && <>
                            <p>Wymagana wiedza:</p>
                            <p>{props.activity.requiredInfo}</p>
                        </>
                        }
                        <Spacer />

                        {loadedScore && <p>Obecna liczba punktów - {pointsReceived}</p>}
                        <p>Maksymalna liczba punktów do zdobycia - {props.activity.maxPoints}</p>
                        {/* TODO: check if it works after the endpoint is here */}
                        <p>Liczba punktów licząca się jako 100% - {props.activity.maxPoints100}</p>
                        <Spacer />

                        {/* //TODO: check which group the user is in and get either 'all' or the group the user belongs to*/}
                        {/* //TODO: Also look into how we will store dates on the back, this is currently a placeholder */}
                        <p>
                            Data dostępności aktywności - od{' '}
                            {/*{startDate.toLocaleDateString() + ' ' + startDate.toLocaleTimeString()} do{' '}*/}
                            {/*{endDate.toLocaleDateString() + ' ' + endDate.toLocaleTimeString()}*/}
                        </p>

                        {/* //TODO: get info from endpoint; compare with current time, decide on time/date format */}
                        <p>Pozostało 5 dni, 10 godzin, 23 minuty, 23 sekundy</p>
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
