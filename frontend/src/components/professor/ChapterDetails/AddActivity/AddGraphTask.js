import React, { useEffect, useRef, useState } from 'react'
import ActivityService from '../../../../services/activity.service'
import { Button, Spinner, Tab, Tabs } from 'react-bootstrap'
import { ERROR_OCCURRED } from '../../../../utils/constants'
import JSONEditor from '../../../general/jsonEditor/JSONEditor'
import { getGraphElements } from '../../../general/Graph/graphHelper'
import Graph from '../../../general/Graph/Graph'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'

function AddGraphTask(props) {
  const [placeholderJson, setPlaceholderJson] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState('')
  const [graphElements, setGraphElements] = useState(null)
  const jsonEditorRef = useRef()

  const getNodeColor = (difficulty) => {
    switch (difficulty) {
      case 'EASY':
        return 'green'
      case 'MEDIUM':
        return 'orange'
      case 'HARD':
        return 'red'
      default:
        return 'gray'
    }
  }

  useEffect(() => {
    if (placeholderJson) {
      const graphInfo = placeholderJson.questions.map((question) => ({
        id: question.questionNum,
        borderColor: getNodeColor(question.difficulty),
        targetIds: question.nextQuestions
      }))

      setGraphElements(getGraphElements(graphInfo))
    }
  }, [placeholderJson])

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
          setErrorMessage(error.response?.data?.message ?? ERROR_OCCURRED)
        })
    }
  }

  const refreshGraph = () => {
    setPlaceholderJson(jsonEditorRef.current?.getJson())
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
        <Tab eventKey={'preview'} title={'Podgląd grafu'}>
          <Graph elements={graphElements} height={'60vh'} layoutName={'klay'} />
          <FontAwesomeIcon icon={faRefresh} onClick={refreshGraph} style={{ cursor: 'pointer' }} />
        </Tab>
      </Tabs>

      {placeholderJson && (
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
      )}
    </>
  )
}

export default AddGraphTask
