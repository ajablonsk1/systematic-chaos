import React from 'react'
import AddActivity from './AddActivity'
import SurveyTaskService from '../../../../services/surveyTask.service'

function AddSurveyTask(props) {
  return (
    <AddActivity
      getActivityJson={SurveyTaskService.getSurveyTaskJson}
      setActivityJson={SurveyTaskService.setSurveyTaskJson}
      chapterId={props.chapterId}
      onSuccess={props.onSuccess}
      onCancel={props.onCancel}
      fileName={'survey-task-configuration.json'}
    />
  )
}

export default AddSurveyTask
