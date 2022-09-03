import React from 'react'
import ActivityService from '../../../../services/activity.service'
import AddActivity from './AddActivity'

function AddCombatTask(props) {
  return (
    <AddActivity
      getActivityJson={ActivityService.getFileTaskJson}
      setActivityJson={ActivityService.setFileTaskJson}
      chapterId={props.chapterId}
      onSuccess={props.onSuccess}
      onCancel={props.onCancel}
    />
  )
}

export default AddCombatTask
