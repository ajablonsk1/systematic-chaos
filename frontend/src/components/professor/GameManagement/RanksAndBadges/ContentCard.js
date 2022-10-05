import React from 'react'
import { CustomCard } from '../../../student/GameCardPage/GameCardStyles'
import CardHeader from 'react-bootstrap/CardHeader'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'

function ContentCard(props) {
  return (
    <CustomCard
      $customHeight={'95vh'}
      $fontColor={props.theme.font}
      $background={props.theme.primary}
      $bodyColor={props.theme.secondary}
    >
      <CardHeader>
        <h5>{props.header}</h5>
      </CardHeader>
      <Card.Body className={'h-75'}>{props.body}</Card.Body>
    </CustomCard>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(ContentCard)
