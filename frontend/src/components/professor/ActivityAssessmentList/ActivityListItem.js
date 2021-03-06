import { Row } from 'react-bootstrap'
import styled from 'styled-components'
import { getActivityImg, getActivityTypeName } from '../../../utils/constants'
import { ActivityImg } from '../../student/AllActivities/ExpeditionTask/ActivityInfo/ActivityInfoStyles'
import { useNavigate } from 'react-router-dom'
import { generateFullPath, PageRoutes } from '../../../routes/PageRoutes'

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
        navigate(
          generateFullPath(() => PageRoutes.Teacher.ActivityAssessment.ACTIVITY_ASSESSMENT),
          {
            state: { activityId: props.activity.activityId }
          }
        )
      }}
    >
      <ActivityImg src={getActivityImg(props.activity.type)}></ActivityImg>
      <div>{`[${props.activity.source}] ${getActivityTypeName(props.activity.type)} - ${props.activity.name}`}</div>
      <div style={{ marginLeft: 'auto' }}>{props.activity.remaining + ' do sprawdzenia'}</div>
    </ActivityListItemRow>
  )
}
