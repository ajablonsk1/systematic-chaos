import { Content } from '../../App/AppGeneralStyles';
import { Col } from 'react-bootstrap';
import ActivityListItem from './ActivityListItem';


// todo: get from endpoint, remove
const exampleActivities = {
    activites: [
        {
            type: 'task',
            source: 'Rozdział 1',
            name: 'Supersystem',
            remaining: 33,
            activityId: 0,
        },
        {
            type: 'task',
            source: 'Rozdział 1',
            name: 'Supersystem II',
            remaining: 23,
            activityId: 1,
        },
        {
            type: 'task',
            source: 'Rozdział 1',
            name: 'Supersystem III',
            remaining: 13,
            activityId: 2,
        },
        {
            type: 'task',
            source: 'Rozdział 1',
            name: 'Supersystem IV',
            remaining: 13,
            activityId: 3,
        },
        {
            type: 'task',
            source: 'Rozdział 1',
            name: 'Supersystem V',
            remaining: 2,
            activityId: 4,
        },
    ],
};

export default function ActivityAssessmentList() {
    return (
        <Content>
            <h1 style={{ marginLeft: '20px', paddingTop: '20px' }}>Aktywności do sprawdzenia</h1>
            <Col style={{ paddingTop: '50px' }}>
                {exampleActivities.activites.map(activity => {
                    return (
                        <ActivityListItem
                            key={activity.name + activity.source}
                            activity={activity}
                        />
                    );
                })}
            </Col>
        </Content>
    );
}
