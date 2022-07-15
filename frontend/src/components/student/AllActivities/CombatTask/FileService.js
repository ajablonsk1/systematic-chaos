import React, { useRef, useState, useTransition } from 'react'
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { SmallDivider } from '../ExpeditionTask/ActivityInfo/ActivityInfoStyles'
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import 'moment/locale/pl'
import { getBase64 } from './fileConverter'
import download from 'downloadjs'
import CombatTaskService from '../../../../services/combatTask.service'

export default function FileService({ task, setFile, setFileName, setIsSaved }) {
  const fileInput = useRef(null)
  const [fileChosen, setFileChosen] = useState(null)

  const [isRemoving, startRemoving] = useTransition()
  const [isAdding, startAdding] = useTransition()

  const saveFile = () => {
    startAdding(() => {
      setFile(fileChosen.content)
      fileInput.current.value = ''
      setFileChosen(null)
    })
  }

  const remove = (fileNumber) => {
    startRemoving(() => {
      setIsSaved(false)
      CombatTaskService.removeCombatTaskFile(task.fileTaskId, fileNumber).then(() => setIsSaved(true))
    })
  }

  const chooseFile = (event) => {
    const filename = event.target.value.split(/(\\|\/)/g).pop()
    setFileName(filename)

    const file = {
      date: moment(new Date()).calendar(),
      content: '',
      filename: filename
    }
    getBase64(event.target).then((data) => {
      file.content = data
    })
    setFileChosen(file)
  }

  const downloadFile = (fileId) => {
    const fileApiId = task.files[fileId].id
    CombatTaskService.getCombatFile(fileApiId).then((file) => {
      if (file.fileString) {
        download(file.fileString, file.name)
      } else {
        alert('Ten plik wygląda na uszkodzony. Nie możesz go pobrać.')
      }
    })
  }

  return (
    <>
      <strong>Załączone pliki:</strong>
      {!task || task.files === null ? (
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
      <input ref={fileInput} type='file' className='mb-5 mt-3' onChange={chooseFile} />
      <Button disabled={!fileChosen} onClick={() => saveFile()}>
        {isAdding ? <Spinner animation={'border'} /> : <span>Dodaj</span>}
      </Button>
    </>
  )
}
