import React from 'react'
import { CustomCard } from '../../student/GameCardPage/GameCardStyles'
import CardHeader from 'react-bootstrap/CardHeader'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'

function GameSummaryCard(props) {
  return (
    <CustomCard $fontColor={props.theme.font} $background={props.theme.primary} $bodyColor={props.theme.secondary}>
      <CardHeader>{props.header}</CardHeader>
      <Card.Body>{props.body}</Card.Body>
    </CustomCard>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(GameSummaryCard)
