import React from 'react'
import { CustomCard } from '../GameCardPage/GameCardStyles'
import CardHeader from 'react-bootstrap/CardHeader'
import { Card } from 'react-bootstrap'

function ContentCard(props) {
  return (
    <CustomCard>
      <CardHeader>
        <h5>{props.header}</h5>
      </CardHeader>
      <Card.Body className={'d-flex align-items-center justify-content-center flex-column'}>{props.body}</Card.Body>
    </CustomCard>
  )
}

export default ContentCard
