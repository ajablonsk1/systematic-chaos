import React, { useEffect, useRef, useState } from 'react'
import ActivityService from '../../../../services/activity.service'
import { Button, Spinner, Tab, Tabs } from 'react-bootstrap'
import { ERROR_OCCURRED } from '../../../../utils/constants'
import JSONEditor from '../../../general/jsonEditor/JSONEditor'

function AddGraphTask(props) {
  const [placeholderJson, setPlaceholderJson] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState('')
  const jsonEditorRef = useRef()

  useEffect(() => {
    ActivityService.getGraphTaskJson()
      .then((response) => {
        setPlaceholderJson(response)
      })
      .catch((error) => {
        setPlaceholderJson(null)
        setErrorMessage(error.response.data.message ?? ERROR_OCCURRED)
      })
  }, [])

  const sendJson = () => {
    const form = jsonEditorRef.current?.getJson()

    if (form) {
      ActivityService.setGraphTaskJson(props.chapterId, form)
        .then(() => {
          props.onSuccess()
        })
        .catch((error) => {
          setErrorMessage(error.replace.data.message ?? ERROR_OCCURRED)
        })
    }
  }

  return (
    <>
      <Tabs defaultActiveKey={'editor'}>
        <Tab eventKey={'editor'} title={'Tryb edycji'}>
          {placeholderJson === undefined ? (
            <Spinner animation={'border'} />
          ) : placeholderJson == null ? (
            <p>{errorMessage}</p>
          ) : (
            <JSONEditor ref={jsonEditorRef} jsonConfig={placeholderJson} />
          )}
        </Tab>
        <Tab eventKey={'preview'} title={'Podgląd grafu'}></Tab>
      </Tabs>

      {placeholderJson && (
        <div className={'d-flex justify-content-center align-items-center pt-4 gap-2'}>
          {errorMessage && <p>{errorMessage}</p>}
          <Button variant={'danger'} onClick={() => props.setShow(false)}>
            Anuluj
          </Button>
          <Button variant={'success'} onClick={() => sendJson()}>
            Dodaj aktywność
          </Button>
        </div>
      )}
    </>
  )
}

export default AddGraphTask
