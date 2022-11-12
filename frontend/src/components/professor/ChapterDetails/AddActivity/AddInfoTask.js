import React from 'react'
import AddActivity from './AddActivity'
import InfoTaskService from '../../../../services/infoTask.service'

function AddInfoTask(props) {
  return (
    <>
      <p className={'fw-bold text-center'}> W polu "infoContent" możesz wpisywać tekst markdown. </p>
      <AddActivity
        getActivityJson={InfoTaskService.getInfoTaskJson}
        setActivityJson={InfoTaskService.setInfoTaskJson}
        chapterId={props.chapterId}
        onSuccess={props.onSuccess}
        onCancel={props.onCancel}
      />
    </>
  )
}

export default AddInfoTask
