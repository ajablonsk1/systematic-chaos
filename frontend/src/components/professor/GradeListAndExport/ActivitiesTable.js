import React from 'react'
import { getActivitiesList } from './mockData'
import { Table } from 'react-bootstrap'
import { getActivityTypeName } from '../../../utils/constants'

function ActivitiesTable(props) {
  const activitiesList = getActivitiesList()

  const getActivityType = (activityId) => {
    return activitiesList.find((activity) => activity.id === activityId)?.activityType
  }

  const headerInputChecked = (event) => event.target && event.target.checked
  const inputChecked = (activityId) => {
    return props.activitiesToExportIds.some(({ activityId: id }) => activityId === id)
  }
  const checkAllRows = (event) =>
    props.setActivitiesToExportIds(
      headerInputChecked(event)
        ? [
            ...activitiesList.map((activity) => ({
              activityId: activity.id,
              activityType: activity.activityType
            }))
          ]
        : []
    )

  const checkRow = (event) => {
    const activityId = +event.target.value
    const activityType = getActivityType(activityId)
    inputChecked(activityId)
      ? props.setActivitiesToExportIds((prevState) => prevState.filter(({ activityId: id }) => id !== activityId))
      : props.setActivitiesToExportIds((prevState) => [...prevState, { activityId, activityType }])
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>
            <input type={'checkbox'} onChange={checkAllRows} />
          </th>
          <th>Nazwa aktywności</th>
          <th>Typ aktywności</th>
          <th>Nazwa rozdziału</th>
        </tr>
      </thead>
      <tbody>
        {activitiesList.map((activity, index) => (
          <tr key={index + Date.now()}>
            <td>
              <input type={'checkbox'} onChange={checkRow} value={activity.id} checked={inputChecked(activity.id)} />
            </td>
            <td>{activity.activityName}</td>
            <td>{getActivityTypeName(activity.activityType)}</td>
            <td>{activity.chapterName}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default ActivitiesTable
