import download from 'downloadjs'
import { Row, Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import CombatTaskService from '../../../../services/combatTask.service'

export default function FeedbackFileService({ feedbackFile }) {
  const downloadFile = () => {
    const fileId = feedbackFile.id
    CombatTaskService.getCombatFile(fileId).then((file) => {
      download(file, feedbackFile.name)
    })
  }

  return (
    <>
      <strong>Załączony plik prowadzącego:</strong>
      {!feedbackFile ? (
        <p>Brak pliku</p>
      ) : (
        <Row className='mt-4'>
          <Col>{feedbackFile.name}</Col>
          <Col>
            <Button variant='warning' className='ml-2' onClick={() => downloadFile()}>
              <FontAwesomeIcon icon={faDownload} />
            </Button>
          </Col>
        </Row>
      )}
    </>
  )
}
