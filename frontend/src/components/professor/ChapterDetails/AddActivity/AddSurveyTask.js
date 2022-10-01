import React, { useState } from 'react'
import AddActivity from './AddActivity'
import { useGetSurveyCreateQuery, usePostSurveyCreateQuery } from '../../../../api/hooks/surveyController.hooks'

function AddSurveyTask(props) {
  const [startActivityAddition, setStartActivityAddition] = useState(false)
  const [formData, setFormData] = useState({ chapterId: props.chapterId, form: null })

  const activityJsonData = useGetSurveyCreateQuery()
  const postActivityJsonData = usePostSurveyCreateQuery(formData, { skip: !startActivityAddition || !formData.form })

  return (
    <AddActivity
      activityJsonData={activityJsonData}
      postActivityJsonData={postActivityJsonData}
      setStartActivityAddition={setStartActivityAddition}
      setJsonData={(jsonData) => setFormData({ ...formData, form: jsonData })}
      onSuccess={props.onSuccess}
      onCancel={props.onCancel}
    />
  )
}

export default AddSurveyTask
