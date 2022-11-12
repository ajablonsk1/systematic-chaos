import React, { useEffect, useTransition, useRef } from 'react'
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { SmallDivider } from '../ExpeditionTask/ActivityInfo/ActivityInfoStyles'
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import download from 'downloadjs'
import CombatTaskService from '../../../../services/combatTask.service'
import { connect } from 'react-redux'

function FileService(props) {
  const { task, setFile, setFileName, setIsFetching, isFetching, isReviewed } = props
  const fileInput = useRef(null)
  const [isRemoving, startRemoving] = useTransition()

  useEffect(() => {
    if (!isFetching && fileInput.current) {
      fileInput.current.value = ''
    }
  }, [isFetching])

  const saveFile = (event) => {
    const filename = event.target.value.split(/(\\|\/)/g).pop()
    setFileName(filename)
    setFile(event.target.files[0])
  }

  const remove = (fileNumber) => {
    startRemoving(() => {
      setIsFetching(true)
      // TODO: this endpoint needs refactoring - it should require only fileId
      CombatTaskService.removeCombatTaskFile(task.fileTaskId, fileNumber)
        .then(() => setIsFetching(false))
        .catch(() => setIsFetching(false))
    })
  }

  const downloadFile = (fileNumber) => {
    const fileId = task.taskFiles[fileNumber].id
    CombatTaskService.getCombatFile(fileId).then((file) => {
      download(file, task.taskFiles[fileNumber].name)
    })
  }

  return (
    <>
      <strong>Załączone pliki studenta:</strong>
      {!task || task.taskFiles?.length === 0 ? (
        <p>Brak dodanych plików</p>
      ) : (
        task.taskFiles?.map((file, idx) => (
          <Row key={idx} className='mt-4'>
            <Col>{file.name}</Col>
            <Col>
              <Button
                style={{ backgroundColor: props.theme.danger, borderColor: props.theme.danger }}
                disabled={isReviewed}
                onClick={() => remove(idx)}
              >
                {isRemoving ? <Spinner animation={'border'} size={'sm'} /> : <FontAwesomeIcon icon={faTrash} />}
              </Button>
              <Button
                style={{ backgroundColor: props.theme.warning, borderColor: props.theme.warning }}
                className='ms-2'
                onClick={() => downloadFile(idx)}
              >
                <FontAwesomeIcon icon={faDownload} />
              </Button>
            </Col>
          </Row>
        ))
      )}
      {!isReviewed && (
        <>
          <SmallDivider $background={props.theme.warning} />
          <strong>Dodaj pliki:</strong>
          <br />
          <input ref={fileInput} type='file' className='mb-5 mt-3' onChange={saveFile} />
        </>
      )}
    </>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(FileService)
