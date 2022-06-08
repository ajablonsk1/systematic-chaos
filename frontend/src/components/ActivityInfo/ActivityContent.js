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
    const points = localStorage.getItem('currentScore');

    //TODO: currently hardcoded for "all" group, we need to check which group the user is in later
    const startDate = new Date(props.activity.accessDates.all.start);
    const endDate = new Date(props.activity.accessDates.all.end);

    console.log(startDate.toLocaleDateString());

    const navigate = useNavigate();
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

                    {/* TODO: check which group the user is in and get either 'all' or the group the user belongs to*/}
                    {/* Also look into how we will store dates on the back, this is currently a placeholder */}
                    <p>
                        Data dostępności aktywności - od{' '}
                        {startDate.toLocaleDateString() + ' ' + startDate.toLocaleTimeString()} do{' '}
                        {endDate.toLocaleDateString() + ' ' + endDate.toLocaleTimeString()}
                    </p>

                    {/* TODO: compare with current time, decide on time/date format */}
                    <p>Pozostało 5 dni, 10 godzin, 23 minuty, 23 sekundy</p>
                </div>

                <ButtonFooter>
                    <Col>
                        <FullDivider />
                        <StartActivityButton
                            onClick={() => {
                                localStorage.removeItem('userAnswers');
                                localStorage.removeItem('userOpenAnswers');
                                navigate(`${PageRoutes.QUESTION_SELECTION}`, {
                                    state: {
                                        activityId: props.activityId,
                                        nodeId: START_GRAPH_NODE_ID,
                                    },
                                });
                            }}
                        >
                            Rozpocznij
                        </StartActivityButton>
                    </Col>
                </ButtonFooter>
            </ActivityCol>
        </>
    );
}
