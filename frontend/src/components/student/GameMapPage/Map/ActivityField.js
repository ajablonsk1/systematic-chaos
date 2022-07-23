import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getActivityByPosition } from '../../../../storage/activityMap'
import { getActivityImg, getActivityPath } from '../../../../utils/constants'
import { ActivityCol } from './ActivityFieldStyle'

export default function ActivityField({ activity, posX, posY, colClickable, colSize }) {
  const navigate = useNavigate()

  // TODO, currently goes to the hard-coded expedition activity but it should be OK once we implement a 'real' activity getter in API
  const startActivity = () => {
    colClickable &&
      navigate(`${getActivityPath(activity.type)}`, {
        state: { activityId: activity.id }
      })
  }

  const isCompletedActivityAround = () => {
    for (let i = posX - 1; i <= posX + 1; i++) {
      for (let j = posY - 1; j <= posY + 1; j++) {
        const adjacentActivity = getActivityByPosition(0, i, j)

        if (adjacentActivity && adjacentActivity.completed) {
          return true
        }
      }
    }
    return false
  }

  return (
    <ActivityCol $isClickable={colClickable} $colSize={colSize}>
      {activity ? (
        <img src={getActivityImg(activity.type)} alt='activityImg' onClick={startActivity} />
      ) : (
        <div
          style={{
            backgroundColor: isCompletedActivityAround() ? 'transparent' : 'white'
          }}
        />
      )}
    </ActivityCol>
  )
}
