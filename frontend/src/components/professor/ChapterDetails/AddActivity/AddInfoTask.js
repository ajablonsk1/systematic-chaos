import React, { useState } from 'react'
import AddActivity from './AddActivity'
import { useGetInfoCreateQuery, usePostInfoCreateQuery } from '../../../../api/hooks/infoController.hooks'

function AddInfoTask(props) {
  const [startActivityAddition, setStartActivityAddition] = useState(false)
  const [formData, setFormData] = useState({ chapterId: props.chapterId, form: null })

  const activityJsonData = useGetInfoCreateQuery()
  const postActivityJsonData = usePostInfoCreateQuery(formData, { skip: !startActivityAddition || !formData.form })

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

export default AddInfoTask
