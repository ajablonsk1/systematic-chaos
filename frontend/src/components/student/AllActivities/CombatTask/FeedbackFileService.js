import download from 'downloadjs'
import { Row, Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import CombatTaskService from '../../../../services/combatTask.service'

export default function FeedbackFileService({ feedbackFiles }) {
  const downloadFile = () => {
    const fileId = feedbackFiles[0].id
    CombatTaskService.getCombatFile(fileId).then((file) => {
      download(file, feedbackFiles[0].name)
    })
  }

  return (
    <>
      <strong>Załączony plik prowadzącego:</strong>
      {!feedbackFiles || feedbackFiles.length === 0 ? (
        <p>Brak pliku</p>
      ) : (
        feedbackFiles?.map((file, idx) => (
          <Row key={idx} className='mt-4'>
            <Col>{file.name}</Col>
            <Col>
              <Button variant='warning' className='ml-2' onClick={() => downloadFile()}>
                <FontAwesomeIcon icon={faDownload} />
              </Button>
            </Col>
          </Row>
        ))
      )}
    </>
  )
}
