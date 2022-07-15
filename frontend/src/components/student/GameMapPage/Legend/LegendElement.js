import React from 'react'
import { getActivityImg, getActivityTypeName } from '../../../../utils/constants'
import { LegendCol } from './LegendStyles'

function LegendElement(props) {
  const activityType = props.activityType
  const img = getActivityImg(activityType)
  const name = getActivityTypeName(activityType)
  const bootstrapClass = props.mobileLast ? 'my-2 mb-md-2 mb-5' : 'my-2'

  return (
    <LegendCol lg={3} md={6} xs={12} className={bootstrapClass}>
      <div>
        <img src={img} alt={name} />
        <p>{name}</p>
      </div>
    </LegendCol>
  )
}

export default LegendElement
