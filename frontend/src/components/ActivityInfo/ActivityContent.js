import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { getActivityImg } from '../../utils/constants';
import {
    ActivityImg,
    ActivityType,
    ActivityName,
    FullDivider,
    SmallDivider,
} from './ActivityInfoStyles';
import { PageRoutes, START_GRAPH_NODE_ID } from '../../utils/constants';
export default function ActivityContent(props) {
    // console.log(props.activity);
    const points = localStorage.getItem('currentScore');
    const navigate = useNavigate();
    return (
        <>
            <Col style={{ overflowY: 'scroll', textAlign: 'center' }}>
                <Col
                    style={{
                        position: 'sticky',
                        top: '0',
                        height: 'auto',

                        backgroundColor: 'var(--dark-blue)',
                    }}
                >
                    <Row style={{ backgroundColor: 'var(--dark-blue)' }}>
                        {/* TODO: add more complete type switch later */}
                        <ActivityImg src={getActivityImg(props.activity.type)}></ActivityImg>
                        <ActivityType>Ekspedycja</ActivityType>
                        <ActivityName>{props.activity.name}</ActivityName>
                    </Row>
                    <FullDivider />
                </Col>

                <div>
                    <p>{props.activity.desc}</p>
                    <SmallDivider />
                    <p>Wymagana wiedza:</p>
                    <p>{props.activity.requiredInfo}</p>
                    <div style={{ height: '5vh' }}></div>
                    {points && <p>Obecna liczba punktów - {points}</p>}
                    <p>Maksymalna liczba punktów do zdobycia - {props.activity.points}</p>
                    <p>Liczba punktów licząca się jako 100% - {props.activity.points_100}</p>
                    <div style={{ height: '5vh' }}></div>
                    {/* TODO: check which group the user is in and get either 'all' or the group the user belongs to*/}
                    <p>
                        Data dostępności aktywności - od {props.activity.accessDates.all.start} do{' '}
                        {props.activity.accessDates.all.end}
                    </p>
                    {/* TODO: compare with current time, decide on time/date format */}
                    <p>Pozostało 5 dni, 10 godzin, 23 minuty, 23 sekundy</p>
                </div>

                <div
                    style={{
                        position: 'sticky',
                        bottom: 0,
                        margin: 0,
                        backgroundColor: 'var(--dark-blue)',
                    }}
                >
                    <Col>
                        <FullDivider />
                        <Button
                            style={{
                                bottom: 0,
                                position: 'relative',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginBottom: '10px',
                            }}
                            onClick={() => {
                                localStorage.removeItem('userAnswers');
                                localStorage.removeItem('userOpenAnswers');
                                navigate(
                                    `${PageRoutes.QUESTION_SELECTION}/${props.activityId}/${START_GRAPH_NODE_ID}`
                                );
                            }}
                        >
                            Rozpocznij
                        </Button>
                    </Col>
                </div>
            </Col>
        </>
    );
}
