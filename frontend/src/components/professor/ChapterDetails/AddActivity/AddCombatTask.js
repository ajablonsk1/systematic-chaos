import React from 'react'
import AddActivity from './AddActivity'
import CombatTaskService from '../../../../services/combatTask.service'
import { Activity } from '../../../../utils/constants'

function AddCombatTask(props) {
  return (
    <AddActivity
      getActivityJson={CombatTaskService.getFileTaskJson}
      setActivityJson={CombatTaskService.setFileTaskJson}
      chapterId={props.chapterId}
      onSuccess={props.onSuccess}
      onCancel={props.onCancel}
      activityType={Activity.TASK}
    />
  )
}

export default AddCombatTask
