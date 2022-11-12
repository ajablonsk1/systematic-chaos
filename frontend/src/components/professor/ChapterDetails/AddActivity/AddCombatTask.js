import React from 'react'
import AddActivity from './AddActivity'
import CombatTaskService from '../../../../services/combatTask.service'

function AddCombatTask(props) {
  return (
    <AddActivity
      getActivityJson={CombatTaskService.getFileTaskJson}
      setActivityJson={CombatTaskService.setFileTaskJson}
      chapterId={props.chapterId}
      onSuccess={props.onSuccess}
      onCancel={props.onCancel}
      fileName={'combat-task-configuration.json'}
    />
  )
}

export default AddCombatTask
