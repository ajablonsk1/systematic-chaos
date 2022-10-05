import React from 'react'
import { Card } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/CardHeader'
import { CustomCard } from './GameCardStyles'
import { connect } from 'react-redux'

function GameCard(props) {
  return (
    <CustomCard
      $customHeight={'97%'}
      $fontColor={props.theme.font}
      $background={props.theme.primary}
      $bodyColor={props.theme.secondary}
    >
      <CardHeader>
        <h5>{props.headerText}</h5>
      </CardHeader>
      <Card.Body className={'h-75'}>{props.content}</Card.Body>
    </CustomCard>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(GameCard)
