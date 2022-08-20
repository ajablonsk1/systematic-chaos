import React, { useEffect, useTransition, useRef } from 'react'
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { SmallDivider } from '../ExpeditionTask/ActivityInfo/ActivityInfoStyles'
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import download from 'downloadjs'
import CombatTaskService from '../../../../services/combatTask.service'

export default function FileService({ task, setFile, setFileName, setIsFetching, isFetching, isRevieved }) {
  const fileInput = useRef(null)
  const [isRemoving, startRemoving] = useTransition()

  useEffect(() => {
    if (!isFetching) {
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
              <Button variant='danger' disabled={isRevieved} onClick={() => remove(idx)}>
                {isRemoving ? <Spinner animation={'border'} /> : <FontAwesomeIcon icon={faTrash} />}
              </Button>
              <Button variant='warning' className='ml-2' onClick={() => downloadFile(idx)}>
                <FontAwesomeIcon icon={faDownload} />
              </Button>
            </Col>
          </Row>
        ))
      )}

      <SmallDivider />
      <strong>Dodaj pliki:</strong>
      <br />
      <input ref={fileInput} type='file' className='mb-5 mt-3' onChange={saveFile} />
    </>
  )
}
