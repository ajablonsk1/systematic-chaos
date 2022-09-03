import React from 'react'
import ActivityService from '../../../../services/activity.service'
import AddActivity from './AddActivity'

function AddSurveyTask(props) {
  return (
    <AddActivity
      getActivityJson={ActivityService.getSurveyTaskJson}
      setActivityJson={ActivityService.setSurveyTaskJson}
      chapterId={props.chapterId}
      onSuccess={props.onSuccess}
      onCancel={props.onCancel}
    />
  )
}

export default AddSurveyTask
