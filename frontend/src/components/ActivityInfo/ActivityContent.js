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

export default function ActivityContent(props) {
    const navigate = useNavigate();
    const points = localStorage.getItem('currentScore'); // todo: remove and get it from endpoint

    //TODO: currently hardcoded for "all" group, we need to check which group the user is in later
    // todo: get user group start and end date from endpoint
    const startDate = new Date(props.activity.accessDates.all.start);
    const endDate = new Date(props.activity.accessDates.all.end);

    const resetStorageAndStart = () => {
        localStorage.setItem('startDate', new Date());
        localStorage.removeItem('userAnswers'); // todo: remove it, saving to db, not to localStorage
        localStorage.removeItem('userOpenAnswers'); // todo: remove it, saving to db, not to localStorage
        navigate(`${PageRoutes.QUESTION_SELECTION}`, {
            state: {
                activityId: props.activityId,
                nodeId: START_GRAPH_NODE_ID,
            },
        });
    };

    return (
        <>
            <ActivityCol className="invisible-scroll">
                <HeaderCol>
                    <HeaderRow>
                        <ActivityImg src={getActivityImg(props.activity.type)}></ActivityImg>
                        <ActivityType>{getActivityTypeName(props.activity.type)}</ActivityType>
                        <ActivityName>{props.activity.name}</ActivityName>
                    </HeaderRow>
                    <FullDivider />
                </HeaderCol>

                <div>
                    <p>{props.activity.desc}</p>
                    <SmallDivider />
                    <p>Wymagana wiedza:</p>
                    <p>{props.activity.requiredInfo}</p>
                    <Spacer />

                    {points && <p>Obecna liczba punktów - {points}</p>}
                    <p>Maksymalna liczba punktów do zdobycia - {props.activity.points}</p>
                    <p>Liczba punktów licząca się jako 100% - {props.activity.points_100}</p>
                    <Spacer />

                    {/* //TODO: check which group the user is in and get either 'all' or the group the user belongs to*/}
                    {/* //TODO: Also look into how we will store dates on the back, this is currently a placeholder */}
                    <p>
                        Data dostępności aktywności - od{' '}
                        {startDate.toLocaleDateString() + ' ' + startDate.toLocaleTimeString()} do{' '}
                        {endDate.toLocaleDateString() + ' ' + endDate.toLocaleTimeString()}
                    </p>

                    {/* //TODO: get info from endpoint; compare with current time, decide on time/date format */}
                    <p>Pozostało 5 dni, 10 godzin, 23 minuty, 23 sekundy</p>
                </div>

                <ButtonFooter>
                    <Col>
                        <FullDivider />
                        <StartActivityButton onClick={() => resetStorageAndStart()}>
                            Rozpocznij
                        </StartActivityButton>
                    </Col>
                </ButtonFooter>
            </ActivityCol>
        </>
    );
}
