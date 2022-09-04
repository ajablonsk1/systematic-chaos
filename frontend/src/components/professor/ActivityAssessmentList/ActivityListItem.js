import { Row } from 'react-bootstrap'
import styled from 'styled-components'
import { getActivityImg, getActivityTypeName } from '../../../utils/constants'
import { ActivityImg } from '../../student/AllActivities/ExpeditionTask/ActivityInfo/ActivityInfoStyles'
import { useNavigate } from 'react-router-dom'
import { TeacherRoutes } from '../../../routes/PageRoutes'
import { Activity } from '../../../utils/constants'

// todo: move it to styles file
const ActivityListItemRow = styled(Row)`
  margin: 20px auto;
  width: 75%;
  background-color: var(--dark-blue);
  color: var(--font-color);
  padding: 8px;
  padding-right: 10px;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`

export default function ActivityListItem(props) {
  const navigate = useNavigate()
  return (
    <ActivityListItemRow
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
