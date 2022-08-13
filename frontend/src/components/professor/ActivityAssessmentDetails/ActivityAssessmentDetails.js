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
  UserInfo
} from './ActivityAssesmentDetailsStyles'
import { getActivityTypeName } from '../../../utils/constants'
//https://www.flaticon.com/free-icon/user-picture_21104
import userPicture from '../../../utils/resources/user-picture.png'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import professorService from '../../../services/professor.service'
import { Activity } from '../../../utils/constants'

export default function ActivityAssessmentDetails() {
  // todo: remove it I think
  // const navigate = useNavigate();
  const location = useLocation();
  const [activityResponseInfo, setActivityResponseInfo] = useState(undefined)

  // we will get data based on the id
  const { activityId } = location.state;
  
  useEffect(() => {
    professorService.getFirstTaskToEvaluate(activityId).then(
      (activityResponseInfo) => {setActivityResponseInfo(activityResponseInfo)}
    )
  }, [activityId])

  return (
    <Content>
      <ContentCol>
        <ActivityTitle>
          <h4>
            {getActivityTypeName(Activity.TASK) + ' - ' + activityResponseInfo.activityName}
          </h4>
        </ActivityTitle>
        <TopInfo>
          <TopInfoCard>
            <h4 style={{ textAlign: 'center' }}>Informacje o użytkowniku</h4>
            <FullDivider />
            <Row styles={{ justifyContent: 'center' }}>
              <img src={userPicture} alt='profile avatar' style={{ paddingLeft: '20px' }}></img>
              <UserInfo>
                <h5 styles={{ width: '100%' }}>{activityResponseInfo.firstName + ' ' + activityResponseInfo.lastName}</h5>

                {/*//TODO: we can do it better, I'm almost sure*/}
                {!activityResponseInfo.isLate && <h5 styles={{ width: '100%' }}>zadanie oddane w terminie</h5>}
                {activityResponseInfo.isLate && <h5 styles={{ width: '100%' }}>zadanie oddane ze spóźnieniem</h5>}
              </UserInfo>
            </Row>
          </TopInfoCard>
          <TopInfoCard>
            <h4 style={{ textAlign: 'center' }}>Informacje o aktywności</h4>
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
          </AnswerCol>
        </AnswerRow>

        <RemarksCol>
          <h4>Uwagi:</h4>
          <RemarksTextArea />
        </RemarksCol>

        <PointsRow>
          <p style={{ top: '50%', position: 'relative', margin: '0' }}>Punkty: </p>
          <Row style={{ display: 'flex' }}>
            <PointsInput type='number' min={0} max={20}></PointsInput>
            <PointsMax>/ {activityResponseInfo.maxPoints}</PointsMax>
          </Row>
        </PointsRow>

        <AcceptButton>Zaakceptuj i przejdź do kolejnej odpowiedzi</AcceptButton>
        <RemainingCount>Pozostało {activityResponseInfo.remaining} odpowiedzi do sprawdzenia</RemainingCount>
      </ContentCol>
    </Content>
  )
}
