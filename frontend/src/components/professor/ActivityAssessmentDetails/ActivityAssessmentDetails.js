import { Content } from '../../App/AppGeneralStyles'
import { Row } from 'react-bootstrap'
import { FullDivider } from '../../student/AllActivities/ExpeditionTask/ActivityInfo/ActivityInfoStyles'
//import { useLocation, useNavigate } from 'react-router-dom';
import {
  AcceptButton,
  ActivityInfo,
  ActivityTitle,
  AnswerCol,
  AnswerContent,
  AnswerRow,
  ContentCol,
  PointsInput,
  PointsMax,
  PointsRow,
  RemainingCount,
  RemarksCol,
  RemarksTextArea,
  TopInfo,
  TopInfoCard,
  UserInfo,
  ActivityAssesmentProfessorFileCol
} from './ActivityAssesmentDetailsStyles'
import { getActivityTypeName } from '../../../utils/constants'
//https://www.flaticon.com/free-icon/user-picture_21104
import userPicture from '../../../utils/resources/user-picture.png'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ProfessorService from '../../../services/professor.service'
import { Activity } from '../../../utils/constants'
import Loader from '../../general/Loader/Loader'
import { generateFullPath, PageRoutes } from '../../../routes/PageRoutes'
import ActivityAssessmentStudentFileService from './ActivityAssessmentStudentFileService'
import { ActivityAssessmentProfessorFileService } from './ActivityAssessmentProfessorFileService'

export default function ActivityAssessmentDetails() {
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
      navigate(generateFullPath(() => PageRoutes.Teacher.ActivityAssessment.ACTIVITY_ASSESSMENT_LIST))
    }
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

  return (
    <Content>
      {activityResponseInfo ? (
        <ContentCol>
          <ActivityTitle>
            <h4>{getActivityTypeName(Activity.TASK) + ' - ' + activityResponseInfo.activityName}</h4>
          </ActivityTitle>
          <TopInfo>
            <TopInfoCard>
              <h4 className={'text-center'}>Informacje o użytkowniku</h4>
              <FullDivider />
              <Row>
                <img src={userPicture} alt='profile avatar' style={{ paddingLeft: '20px', height: '100px' }}></img>
                <UserInfo>
                  <h5>{activityResponseInfo.firstName + ' ' + activityResponseInfo.lastName}</h5>

                  {activityResponseInfo.isLate ? (
                    <h5 className={'w-100'}>zadanie oddane ze spóźnieniem</h5>
                  ) : (
                    <h5 className={'w-100'}>zadanie oddane w terminie</h5>
                  )}
                </UserInfo>
              </Row>
            </TopInfoCard>
            <TopInfoCard>
              <h4 className={'text-center'}>Informacje o aktywności</h4>
              <FullDivider />
              <p style={{ marginBottom: '1px' }}>Treść:</p>
              <ActivityInfo>{activityResponseInfo.activityDetails}</ActivityInfo>
              <p style={{ textAlign: 'center' }}>Punkty: {activityResponseInfo.maxPoints}</p>
            </TopInfoCard>
          </TopInfo>
          <AnswerRow>
            <AnswerCol>
              <h4>Odpowiedź</h4>
              <AnswerContent>{activityResponseInfo.userAnswer}</AnswerContent>
              <div>
                <ActivityAssessmentStudentFileService activityResponseInfo={activityResponseInfo} />
              </div>
            </AnswerCol>
          </AnswerRow>

          <RemarksCol>
            <h4>Uwagi:</h4>
            <RemarksTextArea
              onChange={(newText) => {
                setRemarks(newText.target.value)
              }}
              ref={textRef}
            />
          </RemarksCol>

          <ActivityAssesmentProfessorFileCol>
            <ActivityAssessmentProfessorFileService setFile={setFileBlob} setFileName={setFileName} fileRef={fileRef} />
          </ActivityAssesmentProfessorFileCol>

          <PointsRow>
            <p style={{ top: '50%', position: 'relative', margin: '0' }}>Punkty: </p>
            <Row className={'d-flex'}>
              <PointsInput
                type='number'
                min={0}
                max={activityResponseInfo.maxPoints}
                onChange={(newPointsNum) => {
                  setGivenPoints(newPointsNum.target.value)
                }}
                ref={pointRef}
              ></PointsInput>
              <PointsMax>/ {activityResponseInfo.maxPoints}</PointsMax>
            </Row>
          </PointsRow>

          <AcceptButton
            onClick={sendFeedbackAndGetNextIfAble}
            disabled={!givenPoints || givenPoints < 0 || givenPoints > activityResponseInfo.maxPoints}
          >
            Zaakceptuj i przejdź do kolejnej odpowiedzi
          </AcceptButton>
          <RemainingCount>Pozostało {activityResponseInfo.remaining} odpowiedzi do sprawdzenia</RemainingCount>
        </ContentCol>
      ) : (
        <Loader />
      )}
    </Content>
  )
}
