import { Content } from '../../App/AppGeneralStyles'
import { Row, Col } from 'react-bootstrap'
import { FullDivider } from '../../student/AllActivities/ExpeditionTask/ActivityInfo/ActivityInfoStyles'
//import { useLocation, useNavigate } from 'react-router-dom';
import {
  AcceptButton,
  ActivityInfo,
  AnswerCol,
  AnswerContent,
  AnswerRow,
  PointsInput,
  PointsMax,
  PointsRow,
  RemainingCount,
  RemarksCol,
  RemarksTextArea,
  TopInfo,
  TopInfoCard,
  UserInfo,
  ActivityAssesmentProfessorFileCol,
  HeaderRow,
  ActivityImg,
  ActivityName,
  ActivityType
} from './ActivityAssesmentDetailsStyles'
//https://www.flaticon.com/free-icon/user-picture_21104
import userPicture from '../../../utils/resources/user-picture.png'
import { useEffect, useRef, useState, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ProfessorService from '../../../services/professor.service'
import Loader from '../../general/Loader/Loader'
import { generateFullPath, PageRoutes } from '../../../routes/PageRoutes'
import ActivityAssessmentStudentFileService from './ActivityAssessmentStudentFileService'
import { ActivityAssessmentProfessorFileService } from './ActivityAssessmentProfessorFileService'
import { debounce } from 'lodash'
import { getActivityImg, getActivityTypeName } from '../../../utils/constants'

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

  // const originalContent = () => {
  //   return (
  //     <ContentCol>
  //       <ActivityTitle>
  //         <h4>{getActivityTypeName(Activity.TASK) + ' - ' + activityResponseInfo.activityName}</h4>
  //       </ActivityTitle>
  //       <TopInfo>
  //         <TopInfoCard>
  //           <h4 className={'text-center'}>Informacje o użytkowniku</h4>
  //           <FullDivider />
  //           <Row>
  //             <img src={userPicture} alt='profile avatar' style={{ paddingLeft: '20px', height: '100px' }}></img>
  //             <UserInfo>
  //               <h5>{activityResponseInfo.firstName + ' ' + activityResponseInfo.lastName}</h5>

  //               {activityResponseInfo.isLate ? (
  //                 <h5 className={'w-100'}>zadanie oddane ze spóźnieniem</h5>
  //               ) : (
  //                 <h5 className={'w-100'}>zadanie oddane w terminie</h5>
  //               )}
  //             </UserInfo>
  //           </Row>
  //         </TopInfoCard>
  //         <TopInfoCard>
  //           <h4 className={'text-center'}>Informacje o aktywności</h4>
  //           <FullDivider />
  //           <ActivityInfo>{'Treść: ' + activityResponseInfo.activityDetails}</ActivityInfo>
  //           <p className='text-center'>Punkty: {activityResponseInfo.maxPoints}</p>
  //         </TopInfoCard>
  //       </TopInfo>
  //       <AnswerRow>
  //         <AnswerCol>
  //           <h4>Odpowiedź</h4>
  //           <AnswerContent>{activityResponseInfo.userAnswer}</AnswerContent>
  //           <div>
  //             <ActivityAssessmentStudentFileService activityResponseInfo={activityResponseInfo} />
  //           </div>
  //         </AnswerCol>
  //       </AnswerRow>

  //       <RemarksCol>
  //         <h4>Uwagi:</h4>
  //         <RemarksTextArea onChange={debounceSetText} ref={textRef} />
  //       </RemarksCol>

  //       <ActivityAssesmentProfessorFileCol>
  //         <ActivityAssessmentProfessorFileService setFile={setFileBlob} setFileName={setFileName} fileRef={fileRef} />
  //       </ActivityAssesmentProfessorFileCol>

  //       <PointsRow>
  //         <p className='position-relative m-0 top-50'>Punkty: </p>
  //         <Row className={'d-flex'}>
  //           <PointsInput
  //             type='number'
  //             min={0}
  //             max={activityResponseInfo.maxPoints}
  //             onChange={debounceSetGivenPoints}
  //             ref={pointRef}
  //           ></PointsInput>
  //           <PointsMax>/ {activityResponseInfo.maxPoints}</PointsMax>
  //         </Row>
  //       </PointsRow>

  //       <AcceptButton
  //         onClick={sendFeedbackAndGetNextIfAble}
  //         disabled={!givenPoints || givenPoints < 0 || givenPoints > activityResponseInfo.maxPoints}
  //       >
  //         Zaakceptuj i przejdź do kolejnej odpowiedzi
  //       </AcceptButton>
  //       <RemainingCount>Pozostało {activityResponseInfo.remaining} odpowiedzi do sprawdzenia</RemainingCount>
  //     </ContentCol>
  //   )
  // }

  const HorizontalSpacer = () => <Col style={{ height: '3vh' }} />

  const VerticalSpacer = () => <Row style={{ height: '2vh' }}></Row>

  const Header = () => (
    <>
      <ActivityImg src={getActivityImg('TASK')}></ActivityImg>
      <ActivityType>{getActivityTypeName('TASK')}</ActivityType>
      <ActivityName>{activityResponseInfo.name}</ActivityName>
    </>
  )

  const content = () => {
    return (
      <>
        <HorizontalSpacer />
        <Col
          className='m-0 pt-4 mx-auto'
          style={{ height: '94vh', width: '90%', backgroundColor: 'var(--light-blue)' }}
        >
          <HeaderRow className='p-2 rounded mx-2' style={{ height: '8vh' }}>
            <Header />
          </HeaderRow>

          <VerticalSpacer />

          <TopInfo>
            {/* <TopInfoCard>
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
            <ActivityInfo>{'Treść: ' + activityResponseInfo.activityDetails}</ActivityInfo>
            <p className='text-center'>Punkty: {activityResponseInfo.maxPoints}</p>
          </TopInfoCard> */}
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
            <RemarksTextArea onChange={debounceSetText} ref={textRef} />
          </RemarksCol>

          <ActivityAssesmentProfessorFileCol>
            <ActivityAssessmentProfessorFileService setFile={setFileBlob} setFileName={setFileName} fileRef={fileRef} />
          </ActivityAssesmentProfessorFileCol>

          <PointsRow>
            <p className='position-relative m-0 top-50'>Punkty: </p>
            <Row className={'d-flex'}>
              <PointsInput
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
            onClick={sendFeedbackAndGetNextIfAble}
            disabled={!givenPoints || givenPoints < 0 || givenPoints > activityResponseInfo.maxPoints}
          >
            Zaakceptuj i przejdź do kolejnej odpowiedzi
          </AcceptButton>
          <RemainingCount>Pozostało {activityResponseInfo.remaining} odpowiedzi do sprawdzenia</RemainingCount>
        </Col>
        <HorizontalSpacer />
      </>
    )
  }

  return <Content>{activityResponseInfo ? content() : <Loader />}</Content>
}
