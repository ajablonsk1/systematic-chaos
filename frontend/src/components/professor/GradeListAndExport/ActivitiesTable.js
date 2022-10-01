import React, { useEffect, useState } from 'react'
import { Spinner, Table } from 'react-bootstrap'
import { ERROR_OCCURRED, getActivityTypeName } from '../../../utils/constants'
import ActivityService from '../../../api/services/activity.service'

function ActivitiesTable(props) {
  const [activitiesList, setActivitiesList] = useState(undefined)

  useEffect(() => {
    ActivityService.getActivitiesList()
      .then((response) => {
        setActivitiesList(response)
      })
      .catch(() => {
        setActivitiesList(null)
      })
  }, [])

  const headerInputChecked = (event) => event.target && event.target.checked

  const checkAllRows = (event) =>
    props.setActivitiesToExportIds(
      headerInputChecked(event)
        ? [
            ...activitiesList?.map((activity) => ({
              id: activity.id,
              type: activity.type
            }))
          ]
        : []
    )

  const inputChecked = (activityId, activityType) => {
    return props.activitiesToExportIds.some(({ id, type }) => activityId === id && type === activityType)
  }

  const checkRow = (event) => {
    const [activityId, activityType] = event.target.value.split(',')

    inputChecked(+activityId, activityType)
      ? props.setActivitiesToExportIds((prevState) =>
          prevState.filter(({ id, type }) => !(id === +activityId && activityType === type))
        )
      : props.setActivitiesToExportIds((prevState) => [...prevState, { id: +activityId, type: activityType }])
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
        {activitiesList === undefined ? (
          <tr>
            <td colSpan='100%' className={'text-center'}>
              <Spinner animation={'border'} />
            </td>
          </tr>
        ) : activitiesList == null || activitiesList.length === 0 ? (
          <tr>
            <td colSpan='100%' className={'text-center'}>
              <p>{activitiesList == null ? ERROR_OCCURRED : 'Brak aktywności'}</p>
            </td>
          </tr>
        ) : (
          activitiesList.map((activity, index) => (
            <tr key={index + Date.now()}>
              <td>
                <input
                  type={'checkbox'}
                  onChange={checkRow}
                  value={activity.id + ',' + activity.type}
                  checked={inputChecked(activity.id, activity.type)}
                />
              </td>
              <td>{activity.name}</td>
              <td>{getActivityTypeName(activity.type)}</td>
              <td>{activity.chapterName}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  )
}

export default ActivitiesTable
