import React from 'react'
import { CustomCard } from '../../../GameCardPage/GameCardStyles'
import CardHeader from 'react-bootstrap/CardHeader'
import { Card } from 'react-bootstrap'

function ActivityInfoContentCard(props) {
  return (
    <CustomCard className={'p-0'}>
      <CardHeader>
        <h5>{props.header}</h5>
      </CardHeader>
      <Card.Body>{props.body}</Card.Body>
    </CustomCard>
  )
}

export default ActivityInfoContentCard
