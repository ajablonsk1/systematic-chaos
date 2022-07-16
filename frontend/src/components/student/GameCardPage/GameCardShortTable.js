import { TableContainer } from '../PointsPage/Table/TableStyle'

export const GameCardShortTable = (props) => {
  const TableBody = props.recentActivities.activities.map((activity) => {
    return (
      <tr key={activity.name}>
        <td>{activity.points}</td>
        <td>{activity.type + ': ' + activity.name}</td>
      </tr>
    )
  })

  return (
    <TableContainer striped hover responsive>
      <tbody>{TableBody}</tbody>
    </TableContainer>
  )
}
