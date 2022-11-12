import { Content } from '../../App/AppGeneralStyles'
import { Row, Col } from 'react-bootstrap'
import {
  AcceptButton,
  RemarksTextArea,
  ActivityAssessmentProfessorFileCol,
  PointsRow,
  PointsInput,
  PointsMax
} from './ActivityAssesmentDetailsStyles'
import { useEffect, useRef, useState, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ProfessorService from '../../../services/professor.service'
import Loader from '../../general/Loader/Loader'
import { TeacherRoutes } from '../../../routes/PageRoutes'
import ActivityAssessmentStudentFileService from './ActivityAssessmentStudentFileService'
import { ActivityAssessmentProfessorFileService } from './ActivityAssessmentProfessorFileService'
import { debounce } from 'lodash'
import { HorizontalSpacer, VerticalSpacer, Header } from '../../general/TaskSharedComponents'
import { ERROR_OCCURRED } from '../../../utils/constants'
import { Activity } from '../../../utils/constants'
import { connect } from 'react-redux'
import { isMobileView } from '../../../utils/mobileHelper'
import { SET_ASSESSMENT_NUMBERS } from '../../../actions/types'
import GoBackButton from '../../general/GoBackButton/GoBackButton'

function ActivityAssessmentDetails(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const { activityId } = location.state

  const textRef = useRef(null)
  const fileRef = useRef(null)
  const pointRef = useRef(null)

  const [activityResponseInfo, setActivityResponseInfo] = useState(undefined)
  const [remarks, setRemarks] = useState('')
  const [givenPoints, setGivenPoints] = useState(0)
  const [fileBlob, setFileBlob] = useState()
  const [fileName, setFileName] = useState()

  const isMobileDisplay = isMobileView()

  const debounceSetGivenPoints = useMemo(
    () =>
      debounce((newPointsNum) => {
        setGivenPoints(newPointsNum.target.value)
      }, 200),
    []
  )

  const debounceSetText = useMemo(
    () =>
      debounce((newText) => {
        setRemarks(newText.target.value)
      }, 400),
    []
  )

  const resetStates = () => {
    setRemarks('')
    setGivenPoints(0)
    setFileBlob(undefined)
    setFileName(undefined)
    textRef.current.value = ''
    fileRef.current.value = ''
    pointRef.current.value = ''
  }

  const handleAfterSendingFeedback = () => {
    if (activityResponseInfo?.remaining) {
      resetStates()
      ProfessorService.getFirstTaskToEvaluate(activityId)
        .then((activityResponseInfo) => {
          setActivityResponseInfo(activityResponseInfo)
        })
        .catch(() => {
          setActivityResponseInfo(null)
        })
    } else {
      navigate(TeacherRoutes.ACTIVITY_ASSESSMENT.LIST)
    }
    props.dispatch({ type: SET_ASSESSMENT_NUMBERS, payload: activityResponseInfo?.remaining ?? 0 })
  }

  useEffect(() => {
    ProfessorService.getFirstTaskToEvaluate(activityId)
      .then((activityResponseInfo) => {
        setActivityResponseInfo(activityResponseInfo)
      })
      .catch(() => {
        setActivityResponseInfo(null)
      })
  }, [activityId])

  const sendFeedbackAndGetNextIfAble = () => {
    ProfessorService.sendTaskEvaluation(
      activityResponseInfo.fileTaskResponseId,
      remarks,
      givenPoints,
      fileBlob,
      fileName
    )
      .then(() => {
        handleAfterSendingFeedback()
      })
      .catch(() => {})
  }

  const UserDetails = () => (
    <Col className='m-auto'>
      <h5>
        Autor rozwiązania - {activityResponseInfo.firstName + ' ' + activityResponseInfo.lastName} (
        {'zadanie oddane ' + (activityResponseInfo.isLate ? 'ze spóźnieniem' : 'w terminie')})
      </h5>
    </Col>
  )

  const ResponseDetails = () => (
    <Col>
      <h4>Odpowiedź:</h4>
      <p>{activityResponseInfo.userAnswer}</p>
      <ActivityAssessmentStudentFileService activityResponseInfo={activityResponseInfo} />
    </Col>
  )

  const ActivityDetails = () => (
    <Col>
      <h4>Treść:</h4>
      <p>{activityResponseInfo.activityDetails}</p>
      <h5 className='text-center'>Maksymalna liczba punktów: {activityResponseInfo.maxPoints}</h5>
      <p className='text-center'>Pozostało {activityResponseInfo.remaining} odpowiedzi do sprawdzenia</p>
    </Col>
  )

  const contentBody = () => {
    return (
      <>
        <HorizontalSpacer height={'1vh'} />
        <Col
          className='m-0 pt-4 mx-auto'
          style={{
            height: isMobileDisplay ? 'auto' : '91vh',
            width: isMobileDisplay ? '94%' : '90%',
            backgroundColor: props.theme.secondary
          }}
        >
          <Row
            className='p-2 rounded mx-2'
            style={{ backgroundColor: props.theme.primary, height: isMobileDisplay ? 'auto' : '6vh' }}
          >
            <Header activityName={activityResponseInfo.activityName} activityType={Activity.TASK} />
          </Row>

          <VerticalSpacer height={'1vh'} />

          <Row
            className='p-2 rounded mx-2 overflow-auto text-center'
            style={{ backgroundColor: props.theme.primary, height: isMobileDisplay ? 'auto' : '6vh' }}
          >
            <UserDetails />
          </Row>

          <VerticalSpacer height={'1vh'} />

          <Row
            className='p-2 rounded mx-2 overflow-auto'
            style={{ backgroundColor: props.theme.primary, height: isMobileDisplay ? 'auto' : '18vh' }}
          >
            <ActivityDetails className='overflow-auto' />
          </Row>

          <VerticalSpacer height={'1vh'} />

          <Row
            className='p-2 rounded mx-2 overflow-auto'
            style={{ backgroundColor: props.theme.primary, height: isMobileDisplay ? 'auto' : '18vh' }}
          >
            <ResponseDetails />
          </Row>

          <VerticalSpacer height={'1vh'} />

          <Row
            className='pb-3 rounded mx-2 overflow-auto'
            style={{ backgroundColor: props.theme.primary, height: isMobileDisplay ? 'auto' : '35vh' }}
          >
            <Col className={'d-flex flex-column justify-content-center align-items-center'}>
              <h4>Uwagi:</h4>
              <RemarksTextArea
                $fontColor={props.theme.font}
                $background={props.theme.secondary}
                $borderColor={props.theme.warning}
                onChange={debounceSetText}
                ref={textRef}
              />
              <ActivityAssessmentProfessorFileCol $background={props.theme.primary} $fontColor={props.theme.font}>
                <ActivityAssessmentProfessorFileService
                  setFile={setFileBlob}
                  setFileName={setFileName}
                  fileRef={fileRef}
                />
              </ActivityAssessmentProfessorFileCol>
              <PointsRow>
                <p className='m-0'>Punkty: </p>
                <Row className={'d-flex justify-content-center'}>
                  <PointsInput
                    $fontColor={props.theme.font}
                    $borderColor={props.theme.warning}
                    $background={props.theme.primary}
                    type='number'
                    min={0}
                    max={activityResponseInfo.maxPoints}
                    onChange={debounceSetGivenPoints}
                    ref={pointRef}
                  ></PointsInput>
                  <PointsMax>/ {activityResponseInfo.maxPoints}</PointsMax>
                </Row>
              </PointsRow>
              <AcceptButton
                $background={props.theme.success}
                onClick={sendFeedbackAndGetNextIfAble}
                disabled={!givenPoints || givenPoints < 0 || givenPoints > activityResponseInfo.maxPoints}
              >
                Zaakceptuj i przejdź do kolejnej odpowiedzi
              </AcceptButton>
            </Col>
          </Row>
        </Col>
      </>
    )
  }

  return (
    <Content style={{ color: props.theme.font, marginBottom: isMobileDisplay ? 85 : 0 }}>
      {activityResponseInfo === undefined ? <Loader /> : activityResponseInfo == null ? ERROR_OCCURRED : contentBody()}
      <GoBackButton goTo={TeacherRoutes.ACTIVITY_ASSESSMENT.LIST} />
    </Content>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(ActivityAssessmentDetails)
