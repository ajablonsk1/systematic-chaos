import React, { useLayoutEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getActivityByPosition } from '../../../../storage/activityMap'
import { getActivityImg, getActivityPath } from '../../../../utils/constants'
import { ActivityCol } from './ActivityFieldStyle'

export default function ActivityField({ activity, posX, posY, mapSizeX, mapSizeY }) {
  const activityCol = useRef(null)
  const navigate = useNavigate()

  useLayoutEffect(() => {
    function setHeight() {
      if (activityCol.current) {
        const resizeScale = 0.7
        const possibleSize =
          (Math.min(window.innerHeight, window.innerWidth) * resizeScale) / Math.max(mapSizeY, mapSizeX)
        activityCol.current.setAttribute('style', `height:${possibleSize}px; width: ${possibleSize}px`)
      }
    }

    setHeight() // first time, on component mount
    window.addEventListener('resize', setHeight) // always when window resize
  })

  // TODO, currently goes to the hard-coded expedition activity but it should be OK once we implement a 'real' activity getter in API
  const startActivity = () => {
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
    <ActivityCol ref={activityCol}>
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
