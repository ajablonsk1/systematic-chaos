import React, { useEffect, useRef, useState } from 'react'
import { ERROR_OCCURRED } from '../../../../utils/constants'
import { Button, Tab, Tabs } from 'react-bootstrap'
import JSONEditor from '../../../general/jsonEditor/JSONEditor'
import { connect } from 'react-redux'
import FileUpload from './FileUpload'
import Loader from '../../../general/Loader/Loader'

function AddActivity(props) {
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
        .setActivityJson({ chapterId: props.chapterId, form: form })
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
        <Loader />
      ) : placeholderJson == null ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          <Tabs defaultActiveKey={'editor'}>
            <Tab title={'Tryb edycji'} eventKey={'editor'}>
              <JSONEditor ref={jsonEditorRef} jsonConfig={placeholderJson} />
            </Tab>
            <Tab title={'Dodawanie pliku'} eventKey={'file-upload'}>
              <FileUpload
                jsonToDownload={jsonEditorRef.current?.getJson()}
                setPlaceholderJson={setPlaceholderJson}
                fileName={props.fileName}
              />
            </Tab>
          </Tabs>

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
        </>
      )}
    </div>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(AddActivity)
