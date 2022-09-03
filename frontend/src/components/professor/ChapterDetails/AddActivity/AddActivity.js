import React, { useEffect, useRef, useState } from 'react'
import { ERROR_OCCURRED } from '../../../../utils/constants'
import { Button, Spinner } from 'react-bootstrap'
import JSONEditor from '../../../general/jsonEditor/JSONEditor'

function AddSurveyTask(props) {
  const [placeholderJson, setPlaceholderJson] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState('')
  const jsonEditorRef = useRef()

  useEffect(() => {
    props
      .getActivityJson()
      .then((response) => {
        setPlaceholderJson(response)
      })
      .catch((error) => {
        setPlaceholderJson(null)
        setErrorMessage(error.response.data.message ?? ERROR_OCCURRED)
      })
  }, [props])

  const sendJson = () => {
    const form = jsonEditorRef.current?.getJson()

    if (form) {
      props
        .setActivityJson(props.chapterId, form)
        .then(() => {
          props.onSuccess()
        })
        .catch((error) => {
          setErrorMessage(error.response?.data?.message ?? ERROR_OCCURRED)
        })
    }
  }

  return (
    <div>
      {placeholderJson === undefined ? (
        <Spinner animation={'border'} />
      ) : placeholderJson == null ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          <JSONEditor ref={jsonEditorRef} jsonConfig={placeholderJson} />

          <div className={'d-flex flex-column justify-content-center align-items-center pt-4 gap-2'}>
            {errorMessage && <p className={'text-danger h6'}>{errorMessage}</p>}
            <div className={'d-flex gap-2'}>
              <Button variant={'danger'} onClick={props.onCancel}>
                Anuluj
              </Button>
              <Button variant={'success'} onClick={() => sendJson()}>
                Dodaj aktywność
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AddSurveyTask
