import download from 'downloadjs'
import { Row, Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import CombatTaskService from '../../../../services/combatTask.service'
import { connect } from 'react-redux'

function FeedbackFileService(props) {
  const feedbackFile = props.feedbackFile
  const downloadFile = () => {
    const fileId = feedbackFile.id
    CombatTaskService.getCombatFile(fileId).then((file) => {
      download(file, feedbackFile.name)
    })
  }

  return (
    <Col className={'text-center'}>
      <strong>Załączony plik prowadzącego:</strong>
      {!feedbackFile ? (
        <p>Brak pliku</p>
      ) : (
        <Row className='mt-4'>
          <Col>{feedbackFile.name}</Col>
          <Col>
            <Button
              style={{ backgroundColor: props.theme.success, borderColor: props.theme.success }}
              className='ms-2'
              onClick={downloadFile}
            >
              <FontAwesomeIcon icon={faDownload} />
            </Button>
          </Col>
        </Row>
      )}
    </Col>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(FeedbackFileService)
