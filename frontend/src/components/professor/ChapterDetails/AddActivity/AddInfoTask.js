import React from 'react'
import ActivityService from '../../../../api/services/activity.service'
import AddActivity from './AddActivity'

function AddInfoTask(props) {
  return (
    <AddActivity
      getActivityJson={ActivityService.getInfoTaskJson}
      setActivityJson={ActivityService.setInfoTaskJson}
      chapterId={props.chapterId}
      onSuccess={props.onSuccess}
      onCancel={props.onCancel}
    />
  )
}

export default AddInfoTask
