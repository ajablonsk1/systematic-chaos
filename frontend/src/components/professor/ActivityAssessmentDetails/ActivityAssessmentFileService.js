import { Row, Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import download from 'downloadjs'
import CombatTaskService from '../../../services/combatTask.service'

export default function ActivityAssessmentFileService({ activityResponseInfo }) {
  const downloadFile = (fileNumber) => {
    const fileId = activityResponseInfo.file[fileNumber].id
    CombatTaskService.getCombatFile(fileId).then((file) => {
      download(file, activityResponseInfo.file[fileNumber].name)
    })
  }
  console.log(activityResponseInfo)
  return (
    <>
      <strong>Załączone pliki:</strong>
      {!activityResponseInfo || activityResponseInfo.file?.length === 0 ? (
        <p>Brak dodanych plików</p>
      ) : (
        activityResponseInfo.file?.map((file, idx) => (
          <Row key={idx} className='mt-4'>
            <Col>{file.name}</Col>
            <Col>
              <Button variant='warning' className='ml-2' onClick={() => downloadFile(idx)}>
                <FontAwesomeIcon icon={faDownload} />
              </Button>
            </Col>
          </Row>
        ))
      )}
    </>
  )
}
