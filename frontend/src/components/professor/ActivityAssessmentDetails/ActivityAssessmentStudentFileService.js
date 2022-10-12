import { Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import download from 'downloadjs'
import CombatTaskService from '../../../services/combatTask.service'
import { ActivityAssessmentStudentFileRow } from './ActivityAssesmentDetailsStyles'
import { connect } from 'react-redux'

function ActivityAssessmentStudentFileService(props) {
  const { activityResponseInfo } = props
  const downloadFile = (fileNumber) => {
    const fileId = activityResponseInfo.file[fileNumber].id
    CombatTaskService.getCombatFile(fileId).then((file) => {
      download(file, activityResponseInfo.file[fileNumber].name)
    })
  }
  return (
    <Col className='text-center'>
      <strong>Załączone pliki:</strong>
      {!activityResponseInfo || activityResponseInfo.file?.length === 0 ? (
        <p>Brak dodanych plików</p>
      ) : (
        activityResponseInfo.file?.map((file, idx) => (
          <ActivityAssessmentStudentFileRow key={idx} className='mt-4'>
            <Col>{file.name}</Col>
            <Col>
              <Button
                style={{ backgroundColor: props.theme.warning, borderColor: props.theme.warning }}
                className='ms-2'
                onClick={() => downloadFile(idx)}
              >
                <FontAwesomeIcon icon={faDownload} />
              </Button>
            </Col>
          </ActivityAssessmentStudentFileRow>
        ))
      )}
    </Col>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(ActivityAssessmentStudentFileService)
