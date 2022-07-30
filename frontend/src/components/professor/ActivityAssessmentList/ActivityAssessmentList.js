import { Content } from '../../App/AppGeneralStyles'
import { Col } from 'react-bootstrap'
import ActivityListItem from './ActivityListItem'
import { useEffect, useState } from 'react'
import ProfessorService from '../../../services/professor.service'
import ExpeditionService from '../../../services/expedition.service'

// note: currently the list assumes we only can only manually grade File Tasks - this is due to the way our DB currently works,
// an ID is unique only in the task group. we might need to add task type differentation on the backend if we want to check
// other types of activities in the future

export default function ActivityAssessmentList() {
  const [activityList, setActivityList] = useState('')

  useEffect(() => {
    ProfessorService.getTasksToEvaluateList()
      .then((activityList) => {
        Promise.allSettled(
          activityList.map((element) => {
            return ExpeditionService.getExpedition(element.activityId).then((response) => {
              return {
                activity: response,
                toGrade: element.toGrade
              }
            })
          })
        ).then((response) => {
          setActivityList(
            response.map((element) => {
              return {
                activity: element.value
              }
            })
          )
        })
      })

      .catch((error) => {
        throw error
      })
  }, [])

  return (
    <Content>
      <h1 style={{ marginLeft: '20px', paddingTop: '20px' }}>Aktywności do sprawdzenia</h1>
      <Col style={{ paddingTop: '50px' }}>
        {activityList &&
          activityList.map((activity) => {
            const listActivity = activity.activity.activity
            const toGrade = activity.activity.toGrade
            console.log(listActivity)
            console.log(toGrade)
            return <ActivityListItem key={listActivity.name} activity={listActivity} toGrade={toGrade} />
          })}
      </Col>
    </Content>
  )
}
