import React, { useEffect, useRef } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import JSONEditor from '../../../general/jsonEditor/JSONEditor'

function AddActivity(props) {
  const jsonEditorRef = useRef()

  useEffect(() => {
    if (props.postActivityJsonData?.isSuccess) {
      props.onSuccess()
    }
    if (props.postActivityJsonData?.isSuccess || props.postActivityJsonData?.isError) {
      props.setJsonData(null)
      props.setStartActivityAddition(false)
    }
    // eslint-disable-next-line
  }, [props.postActivityJsonData?.isSuccess, props.postActivityJsonData?.isError])

  return props.activityJsonData ? (
    <div>
      {props.activityJsonData.isFetching ? (
        <Spinner animation={'border'} />
      ) : props.activityJsonData.isError ? (
        <p>{props.activityJsonData.errorInfo}</p>
      ) : (
        props.activityJsonData.data && (
          <>
            <JSONEditor ref={jsonEditorRef} jsonConfig={props.activityJsonData.data} />

            <div className={'d-flex flex-column justify-content-center align-items-center pt-4 gap-2'}>
              {props.postActivityJsonData.isError && (
                <p className={'text-danger h6'}>{props.postActivityJsonData.errorInfo}</p>
              )}
              <div className={'d-flex gap-2'}>
                <Button variant={'danger'} onClick={props.onCancel}>
                  Anuluj
                </Button>
                <Button
                  variant={'success'}
                  onClick={() => {
                    props.setStartActivityAddition(true)
                    props.setJsonData(jsonEditorRef.current?.getJson())
                  }}
                >
                  Dodaj aktywność
                </Button>
              </div>
            </div>
          </>
        )
      )}
    </div>
  ) : (
    <></>
  )
}

export default AddActivity
