import { useEffect, useState } from 'react'
import { Content } from '../../App/AppGeneralStyles'
import { Col } from 'react-bootstrap'
import ActivityListItem from './ActivityListItem'
import ProfessorService from '../../../services/professor.service'
import combatTaskService from '../../../services/combatTask.service'
import Loader from '../../general/Loader/Loader'
import { ERROR_OCCURED } from '../../../utils/constants'

// note: currently the list assumes we only can only manually grade File Tasks - this is due to the way our DB currently works,
// an ID is unique only in the task group. we might need to add task type differentation on the backend if we want to check
// other types of activities in the future

export default function ActivityAssessmentList() {
  const [activityList, setActivityList] = useState(undefined)

  useEffect(() => {
    ProfessorService.getTasksToEvaluateList()
      .then((activityList) => {
        Promise.allSettled(
          activityList.map((element) => {
            return combatTaskService.getCombatTaskProfessor(element.activityId).then((response) => {
              return {
                activity: response,
                toGrade: element.toGrade
              }
            })
          })
        ).then((response) => {
          setActivityList(
            response.map((activity) => {
              return {
                activity: activity.value
              }
            })
          )
        })
      })

      .catch(() => {
        setActivityList(null)
      })
  }, [])

  return (
    <Content>
      <h1 style={{ marginLeft: '20px', paddingTop: '20px' }}>Aktywności do sprawdzenia</h1>
      <Col style={{ paddingTop: '50px' }}>
        {activityList === undefined ? (
          <Loader />
        ) : activityList == null ? (
          <p>{ERROR_OCCURED}</p>
        ) : (
          activityList.map((activity) => {
            const listActivity = activity.activity.activity
            const toGrade = activity.activity.toGrade
            return <ActivityListItem key={listActivity.name} activity={listActivity} toGrade={toGrade} />
          })
        )}
      </Col>
    </Content>
  )
}
