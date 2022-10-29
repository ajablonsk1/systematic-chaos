import React from 'react'
import { CustomCard } from '../GameCardPage/GameCardStyles'
import CardHeader from 'react-bootstrap/CardHeader'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'

function ContentCard(props) {
  return (
    <CustomCard $fontColor={props.theme.font} $background={props.theme.primary} $bodyColor={props.theme.secondary}>
      <CardHeader>
        <h5>{props.header}</h5>
      </CardHeader>
      <Card.Body
        className={`d-flex flex-column ${props.maxHeight ? '' : 'align-items-center justify-content-center'}`}
        style={{ maxHeight: props.maxHeight ?? 'none', overflow: props.maxHeight ? 'auto' : 'visible' }}
      >
        {props.body}
      </Card.Body>
    </CustomCard>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(ContentCard)
