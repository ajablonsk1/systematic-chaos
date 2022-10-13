import { Row } from 'react-bootstrap'
import styled from 'styled-components'
import { getActivityImg, getActivityTypeName } from '../../../utils/constants'
import { ActivityImg } from '../../student/AllActivities/ExpeditionTask/ActivityInfo/ActivityInfoStyles'
import { useNavigate } from 'react-router-dom'
import { TeacherRoutes } from '../../../routes/PageRoutes'
import { Activity } from '../../../utils/constants'
import { connect } from 'react-redux'
import { isMobileView } from '../../../utils/mobileHelper'

// todo: move it to styles file
const ActivityListItemRow = styled(Row)`
  margin: 20px auto;
  background-color: ${(props) => props.$background};
  color: ${(props) => props.$fontColor};
  padding: 8px;
  padding-right: 10px;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`

function ActivityListItem(props) {
  const navigate = useNavigate()
  return (
    <ActivityListItemRow
      style={{ width: isMobileView() ? '95%' : '75%' }}
      $background={props.theme.primary}
      $fontColor={props.theme.font}
      onClick={() => {
        navigate(TeacherRoutes.ACTIVITY_ASSESSMENT.ACTIVITY, {
          state: { activityId: props.activity.fileTaskId }
        })
      }}
    >
      <ActivityImg src={getActivityImg(Activity.TASK)}></ActivityImg>
      <div>{`${getActivityTypeName(Activity.TASK)} - ${props.activity.activityName}`}</div>
      <div style={{ marginLeft: 'auto' }}>{props.toGrade + ' do sprawdzenia'}</div>
    </ActivityListItemRow>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(ActivityListItem)
