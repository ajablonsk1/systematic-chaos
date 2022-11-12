import React from 'react'
import AddActivity from './AddActivity'
import SurveyTaskService from '../../../../services/surveyTask.service'
import { Activity } from '../../../../utils/constants'

function AddSurveyTask(props) {
  return (
    <AddActivity
      getActivityJson={SurveyTaskService.getSurveyTaskJson}
      setActivityJson={SurveyTaskService.setSurveyTaskJson}
      chapterId={props.chapterId}
      onSuccess={props.onSuccess}
      onCancel={props.onCancel}
      activityType={Activity.SURVEY}
    />
  )
}

export default AddSurveyTask
