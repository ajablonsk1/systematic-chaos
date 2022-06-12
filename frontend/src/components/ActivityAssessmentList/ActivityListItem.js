import { Row } from 'react-bootstrap';
import styled from 'styled-components';
import { getActivityTypeName, getActivityImg } from '../../utils/constants';
import { ActivityImg } from '../ActivityInfo/ActivityInfoStyles';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../utils/constants';

const ActivityListItemRow = styled(Row)`
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 75%;
    background-color: var(--dark-blue);
    color: var(--font-color);
    padding: 8px;
    padding-right: 10px;
    text-align: center;

    &:hover {
        cursor: pointer;
    }
`;

export default function ActivityListItem(props) {
    const navigate = useNavigate();

    return (
        <ActivityListItemRow
            key={props.activity.name}
            onClick={() => {
                console.log('Elo od ' + props.activity.name);
                navigate(`${PageRoutes.ACTIVITY_ASSESSMENT}`, {
                    state: { activityId: props.activity.activityId },
                });
            }}
        >
            <ActivityImg src={getActivityImg(props.activity.type)}></ActivityImg>
            <div>
                {'[' +
                    props.activity.source +
                    '] ' +
                    getActivityTypeName(props.activity.type) +
                    ' - ' +
                    props.activity.name}
            </div>
            <div style={{ marginLeft: 'auto' }}>{props.activity.remaining + ' do sprawdzenia'}</div>
        </ActivityListItemRow>
    );
}
