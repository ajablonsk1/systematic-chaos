import {
  ActivityImg,
  ActivityName,
  ActivityType
} from '../student/AllActivities/ExpeditionTask/ActivityInfo/ActivityInfoStyles'
import { getActivityImg, getActivityTypeName } from '../../utils/constants'
import { Row, Col } from 'react-bootstrap'
export function Header({ activityName, activityType }) {
  return (
    <>
      <ActivityImg src={getActivityImg(activityType)}></ActivityImg>
      <ActivityType>{getActivityTypeName(activityType)}</ActivityType>
      <ActivityName>{activityName}</ActivityName>
    </>
  )
}

export function VerticalSpacer({ height }) {
  return <Row style={{ height: height }} />
}

export function HorizontalSpacer({ height }) {
  return <Col style={{ height: height }} />
}

export function ActivityDetails({ description }) {
  return (
    <Col>
      <h2>Treść:</h2>
      <p>{description}</p>
    </Col>
  )
}
