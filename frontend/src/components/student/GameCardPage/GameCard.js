import React from 'react'
import { Card } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/CardHeader'
import { CustomCard } from './GameCardStyles'

function GameCard(props) {
  return (
    <CustomCard $customHeight={'97%'}>
      <CardHeader>
        <h5>{props.headerText}</h5>
      </CardHeader>
      <Card.Body className={'h-75'}>{props.content}</Card.Body>
    </CustomCard>
  )
}

export default GameCard
