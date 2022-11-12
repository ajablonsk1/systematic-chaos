import React, { useEffect, useRef, useState } from 'react'
import { Button, Tab, Tabs } from 'react-bootstrap'
import { Activity, ERROR_OCCURRED } from '../../../../utils/constants'
import JSONEditor from '../../../general/jsonEditor/JSONEditor'
import { getGraphElements, getNodeColor } from '../../../general/Graph/graphHelper'
import Graph from '../../../general/Graph/Graph'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import ExpeditionService from '../../../../services/expedition.service'
import { connect } from 'react-redux'
import Loader from '../../../general/Loader/Loader'
import FileUpload from './FileUpload'

function AddGraphTask(props) {
  const [placeholderJson, setPlaceholderJson] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState('')
  const [graphElements, setGraphElements] = useState(null)

  const jsonEditorRef = useRef()

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
    ExpeditionService.getGraphTaskJson()
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
      ExpeditionService.setGraphTaskJson(props.chapterId, form)
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
            <Loader />
          ) : placeholderJson == null ? (
            <p>{errorMessage}</p>
          ) : (
            <JSONEditor ref={jsonEditorRef} jsonConfig={placeholderJson} />
          )}
        </Tab>
        <Tab eventKey={'file-upload'} title={'Dodawanie pliku'}>
          <FileUpload
            jsonToDownload={jsonEditorRef.current?.getJson()}
            setPlaceholderJson={setPlaceholderJson}
            activityType={Activity.EXPEDITION}
          />
        </Tab>
        <Tab eventKey={'preview'} title={'Podgląd grafu'}>
          <Graph elements={graphElements} height={'60vh'} layoutName={'klay'} onNodeClick={() => {}} />
          <FontAwesomeIcon icon={faRefresh} onClick={refreshGraph} style={{ cursor: 'pointer' }} />
        </Tab>
      </Tabs>

      {placeholderJson && (
        <div className={'d-flex flex-column justify-content-center align-items-center pt-4 gap-2'}>
          {errorMessage && (
            <p style={{ color: props.theme.danger }} className={'h6'}>
              {errorMessage}
            </p>
          )}
          <div className={'d-flex gap-2'}>
            <Button
              style={{ backgroundColor: props.theme.danger, borderColor: props.theme.danger }}
              onClick={props.onCancel}
            >
              Anuluj
            </Button>
            <Button
              style={{ backgroundColor: props.theme.success, borderColor: props.theme.success }}
              onClick={() => sendJson()}
            >
              Dodaj aktywność
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(AddGraphTask)
