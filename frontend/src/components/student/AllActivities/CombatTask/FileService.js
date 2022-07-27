import React, { useEffect, useRef, useState, useTransition } from 'react'
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { SmallDivider } from '../ExpeditionTask/ActivityInfo/ActivityInfoStyles'
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import download from 'downloadjs'
import CombatTaskService from '../../../../services/combatTask.service'
import { getBase64 } from './fileConverter'

export default function FileService({ task, setFile, setFileName, setIsSaved, isSaved }) {
  const fileInput = useRef(null)
  const [isRemoving, startRemoving] = useTransition()

  useEffect(() => {
    if (isSaved) fileInput.current.value = ''
  }, [isSaved])

  const saveFile = (event) => {
    const filename = event.target.value.split(/(\\|\/)/g).pop()
    setFileName(filename)
    setFile(event.target.files[0])

    getBase64(event.target).then((response) => console.log(response, typeof response))
  }

  const remove = (fileNumber) => {
    startRemoving(() => {
      setIsSaved(false)
      // TODO: this endpoint needs refactoring - it should require only fileId
      CombatTaskService.removeCombatTaskFile(task.fileTaskId, fileNumber).then(() => setIsSaved(true))
    })
  }

  const downloadFile = (fileId) => {
    const fileApiId = task.files[fileId].id
    CombatTaskService.getCombatFile(fileApiId).then((file) => {
      if (file?.fileString) {
        download(file.fileString, file.name)
      } else {
        alert('Ten plik wygląda na uszkodzony. Nie możesz go pobrać.')
      }
    })
  }

  return (
    <>
      <strong>Załączone pliki:</strong>
      {!task || task.files?.length === 0 ? (
        <p>Brak dodanych plików</p>
      ) : (
        task.files?.map((file, idx) => (
          <Row key={idx} className='mt-4'>
            {/*<Col>{file.date}</Col>*/}
            {/*<Col>{file.author}</Col>*/}
            <Col>{file.name}</Col>
            <Col>
              <Button
                variant='danger'
                // disabled={loggedUserName !== file.author}
                onClick={() => remove(idx)}
              >
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
