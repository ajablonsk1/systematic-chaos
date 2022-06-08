import { TableContainer } from '../PointsPage/Table/TableStyle';

export const GameCardShortTable = (props) => {
    return (
        <TableContainer striped hover responsive>
            <tbody>
            {props.recentActivities.activities.map(activity => {
                return(
                    <tr key={activity.name}>
                    <td>{activity.points}</td>
                    <td>{activity.type + ": " + activity.name}</td>
                </tr>)
            })}
            </tbody>
        </TableContainer>
    );
};
