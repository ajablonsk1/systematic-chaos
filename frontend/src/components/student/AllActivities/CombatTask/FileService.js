import React, { useEffect, useRef, useTransition } from 'react'
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { SmallDivider } from '../ExpeditionTask/ActivityInfo/ActivityInfoStyles'
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import download from 'downloadjs'
import CombatTaskService from '../../../../services/combatTask.service'

export default function FileService({ task, setFile, setFileName, setIsFetching, isFetching }) {
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
      CombatTaskService.removeCombatTaskFile(task.fileTaskId, fileNumber).then(() => setIsFetching(false))
    })
  }

  const downloadFile = (fileNumber) => {
    const fileId = task.files[fileNumber].id
    CombatTaskService.getCombatFile(fileId).then((file) => {
      if (file?.file) {
        console.log(file.file)
        download(file.file, file.name)
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
