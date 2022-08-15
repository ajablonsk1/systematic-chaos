import React from 'react'
import { getActivitiesList } from './mockData'
import { Table } from 'react-bootstrap'
import { getActivityTypeName } from '../../../utils/constants'

function ActivitiesTable(props) {
  const activitiesList = getActivitiesList()

  const headerInputChecked = (event) => event.target && event.target.checked
  const inputChecked = (activityId) => props.activitiesToExportIds.includes(activityId)
  const checkAllRows = (event) =>
    props.setActivitiesToExportIds(headerInputChecked(event) ? [...activitiesList.map((activity) => activity.id)] : [])

  const checkRow = (event) => {
    const activityId = +event.target.value
    inputChecked(activityId)
      ? props.setActivitiesToExportIds((prevState) => prevState.filter((id) => id !== activityId))
      : props.setActivitiesToExportIds((prevState) => [...prevState, activityId])
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
