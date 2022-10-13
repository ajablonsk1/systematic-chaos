import {
  ActivityImg,
  ActivityName,
  ActivityType
} from '../student/AllActivities/ExpeditionTask/ActivityInfo/ActivityInfoStyles'
import { getActivityImg, getActivityTypeName } from '../../utils/constants'
import { Row, Col } from 'react-bootstrap'
import { isMobileView } from '../../utils/mobileHelper'

export function Header({ activityName, activityType }) {
  return (
    <div className={`d-flex justify-content-center ${isMobileView() ? 'flex-column' : 'flex-row'}`}>
      <div className={'d-flex align-items-center justify-content-center'}>
        <ActivityImg src={getActivityImg(activityType)} />
        <ActivityType className={'m-0 ps-2'}>{getActivityTypeName(activityType)}</ActivityType>
      </div>

      <ActivityName style={{ marginLeft: isMobileView() ? 0 : 'auto' }}>{activityName}</ActivityName>
    </div>
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
